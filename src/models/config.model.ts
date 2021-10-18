const servicePaths:IConfig = require("../../configs/servicePaths.json");
const coinSymbols:IConfig = require("../../configs/coinSymbols.json");

export interface IConfig {
    values: IConfigValue[];
}

interface IConfigValue {
    name: string;
    value: string;
}

class AppConfig {
    getValueByName(name:string):string {
        let index = servicePaths.values.findIndex(configValue => configValue.name==name);
        return servicePaths.values[index].value;
    }
    getCoinSymbolByName(name:string):string {
        let index = coinSymbols.values.findIndex(configValue => configValue.name==name);
        return coinSymbols.values[index].value;
    }
}

export default new AppConfig();