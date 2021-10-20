import { cryptoScan } from "./models/models";

let btcScanner = new cryptoScan(1, 10.0, 20.0);
let ethScanner = new cryptoScan(2, 10.0, 20.0);

btcScanner.scanCrypto();
ethScanner.scanCrypto();