// import express from 'express'
// import cookieParser from 'cookie-parser';
import axios, { AxiosResponse } from 'axios';

import {ICriptoPriceService} from './models/criptoPriceService.model'
import appConfig from './models/config.model'


// const PORT = 3000;
// const app = express();

// app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());

// app.get('/', (req, res) => res.json({}));

// app.listen(PORT, () => console.log("Server running on port: "+PORT));

scanCripto();

async function scanCripto() {
    let res:AxiosResponse<ICriptoPriceService> = await axios.get(appConfig.getValueByName("binanceApiUri"));
    
    if (res.data.data.indexPrice != undefined)
        console.log(res.data.data.indexPrice);
    setTimeout(() => scanCripto(), 1000);
}