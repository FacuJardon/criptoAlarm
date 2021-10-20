import axios, { AxiosResponse } from 'axios';

import { configModel, ICriptoPriceService } from './models';



export default class cryptoScan {
    coinId:number | string;
    nextTopAlarm?:number;
    nextBottomAlarm?:number;
    
    constructor(coinId:number | string, nextTopAlarm?:number, nextBottomAlarm?:number)   {
        
        if (typeof coinId != 'string')
            this.coinId = this.getCryptoPairById(coinId);
        else this.coinId = coinId;

        if (nextBottomAlarm !== undefined)
            this.nextBottomAlarm = nextBottomAlarm;
        if (nextTopAlarm !== undefined)
            this.nextTopAlarm = nextTopAlarm;
    }

    getCryptoPairById(id:number):string {
        return configModel.getCoinSymbolByID(id);
    }

    async scanCrypto() {
    
        let url:string =  configModel.getValueByName("binanceApiUri")+this.coinId;
        let res:AxiosResponse<ICriptoPriceService> = await axios.get(url);
        
        if (res.data.price != undefined)
            console.log(this.coinId+": "+res.data.price);
        setTimeout(() => this.scanCrypto(), 1000);
    }
}