import { cryptoScan } from "./models/models";

let btcScanner = new cryptoScan(1, 10.0, 20.0);
let ethScanner = new cryptoScan("ETHUSDT", 10.0, 20.0);

btcScanner.startScan();
ethScanner.startScan();