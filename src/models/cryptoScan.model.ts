import axios, { AxiosResponse } from 'axios';

import { IAlarms, IAlarm } from './alarm.model';
import { alarmRepositorie } from '../repositories/repositories';
import { appConfig, ICriptoPriceService } from './models';



export default class cryptoScan {
    private topAlarmList?:IAlarms;
    private bottomAlarmList?:IAlarms;
    private price?:number;
    coinId:number | string;
    topAlarm?:IAlarm;
    bottomAlarm?:IAlarm;
    scanning:boolean = false;
    
    constructor(coinId:number | string)   {
        
        if (typeof coinId != 'string')
            this.coinId = appConfig.getCoinSymbolByID(coinId);
        else 
            this.coinId = appConfig.getCoinSymbolByName(coinId);

        this.fillAlarmList();
    }
    
    get isScanning():boolean {
        return this.scanning;
    }
    
    async fillAlarmList()  {
        let price:number = await this.requestPrice();
        
        this.topAlarmList = alarmRepositorie.getTopAlarmList(price);
        this.topAlarm = this.topAlarmList.values.shift();

        this.bottomAlarmList = alarmRepositorie.getBottomAlarmList(price);
        this.bottomAlarm = this.bottomAlarmList.values.shift();
    }

    stopScan():void  {
        this.scanning = false;
    }

    startScan():void    {
        
        if (this.areNullAlarms())  {
            console.log("Alarmas no seteadas.");
        }
        if (this.isScanning)    {
            console.log("El scanner ya esta activo.");
            return;
        }
        this.scanning = true;
        this.requestApi();
    }

    areNullAlarms():boolean  {
        return this.topAlarm == null && this.bottomAlarm == null
    }

    async requestPrice(): Promise<number>    {
        let url:string =  appConfig.getValueByName("binanceApiUri")+this.coinId;
        let res:AxiosResponse<ICriptoPriceService> = await axios.get(url);

        if (res.data.price != undefined)
            return parseFloat(res.data.price);
        
        console.log("ApiError: Status: ["+res.status+"] "+res.data);
        return -1.0;
    }
    
    async requestApi() {
        
        this.price = await this.requestPrice();

        this.validateAlarms(this.price);

        if (this.scanning)
            setTimeout(() => this.requestApi(), 1000);
    }

    validateAlarms(price:number):void {
        if (this.topAlarm !== undefined && this.topAlarm.alarm < price)   {
            console.log(this.coinId+": Alarma superior excedida: "+price);
            this.setNextTopAlarm();
        }
        if (this.bottomAlarm !== undefined && this.bottomAlarm.alarm > price) {
            console.log(this.coinId+": Alarma inferior excedida: "+price);
            this.setNextBottomAlarm();
        }
    }

    setNextTopAlarm():void {
        if (this.topAlarm != undefined && this.topAlarmList != undefined)
            this.topAlarm = this.topAlarmList.values.shift();
    }

    setNextBottomAlarm():void {
        if (this.bottomAlarm != undefined && this.bottomAlarmList != undefined)
            this.bottomAlarm = this.bottomAlarmList.values.shift();
    }
}