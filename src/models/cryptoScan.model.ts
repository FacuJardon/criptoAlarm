import axios, { AxiosResponse } from 'axios';

import { configModel, ICriptoPriceService } from './models';



export default class cryptoScan {
    coinId:number | string;
    topAlarm:number | null = null;
    bottomAlarm:number | null = null;
    scanning:boolean = false;
    
    constructor(coinId:number | string, topAlarm?:number, bottomAlarm?:number)   {
        
        if (typeof coinId != 'string')
            this.coinId = this.getCryptoPairById(coinId);
        else this.coinId = coinId;

        if (bottomAlarm !== undefined)
            this.bottomAlarm = bottomAlarm;
        if (topAlarm !== undefined)
            this.topAlarm = topAlarm;
    }

    get isScanning():boolean {
        return this.scanning;
    }

    getCryptoPairById(id:number):string {
        return configModel.getCoinSymbolByID(id);
    }
    stopScan()  {
        this.scanning = false;
    }
    startScan()    {
        
        if (this.isNullAlarms())  {
            console.log("Alarmas no seteadas.");
            return;
        }
        if (this.isScanning)    {
            console.log("El scanner ya esta activo.");
            return;
        }
        this.scanning = true;
        this.requestApi();
    }

    isNullAlarms():boolean  {
        return this.topAlarm == null || this.bottomAlarm == null
    }

    async requestApi() {

        let url:string =  configModel.getValueByName("binanceApiUri")+this.coinId;
        let res:AxiosResponse<ICriptoPriceService> = await axios.get(url);
        
        if (res.data.price != undefined)
            this.validateAlarms(parseFloat(res.data.price));
        else console.log("ApiError: Status: ["+res.status+"] "+res.data);

        if (this.scanning)
            setTimeout(() => this.requestApi(), 1000);
    }

    validateAlarms(price:number) {
        if (this.topAlarm !== null && this.topAlarm! < price)   {
            console.log(this.coinId+": Alarma superior excedida: "+price);
            this.topAlarm = this.getNextTopAlarm();
        }
        if (this.bottomAlarm !== null && this.bottomAlarm! > price) {
            console.log(this.coinId+": Alarma inferior excedida: "+price);
            this.bottomAlarm = this.getNextBottomAlarm();
        }
    }
    getNextTopAlarm():number {
        return 3945.0;
    }
    getNextBottomAlarm():number {
        return 3920.0;
    }
}