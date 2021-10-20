const servicePaths:IConfig = require("../../configs/servicePaths.json");
const coinSymbols:IConfig = require("../../configs/coinSymbols.json");

export interface IConfig {
    values: IConfigValue[];
}

interface IConfigValue {
    id: number;
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
    getCoinSymbolByID(id:number):string {
        let index = coinSymbols.values.findIndex(configValue => configValue.id==id);
        return coinSymbols.values[index].value;
    }

    getSymbolList():string[] {
        let list:string[] = [];
        for (let index = 0;index < coinSymbols.values.length;index++)   {
            list.push(coinSymbols.values[index].value);
        }
        return list;
    }
}

export default new AppConfig();