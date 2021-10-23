import { cryptoScan } from "./models/models";

let btcScanner = new cryptoScan(1);
let ethScanner = new cryptoScan("ETHEREUM");

btcScanner.startScan();
ethScanner.startScan();