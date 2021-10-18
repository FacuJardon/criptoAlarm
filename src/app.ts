// import express from 'express'
// import cookieParser from 'cookie-parser';
import axios, { AxiosPromise, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

import {ICriptoPriceService} from './models/criptoPriceService.model'
import appConfig from './models/config.model'

const url:string =  appConfig.getValueByName("binanceApiUri")+appConfig.getCoinSymbolByName("bitcoin");
const headersService = {
    headers: {
        'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
    }
}

// const PORT = 3000;
// const app = express();

// app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());

// app.get('/', (req, res) => res.json({}));

// app.listen(PORT, () => console.log("Server running on port: "+PORT));

scanCripto();

async function scanCripto() {

    let res:AxiosResponse<ICriptoPriceService> = await axios.get(url, headersService);
    
    if (res.data.price != undefined)
        console.log(res.data.price);
    setTimeout(() => scanCripto(), 1000);
}