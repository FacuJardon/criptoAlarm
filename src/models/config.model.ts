const mainConfig:IConfig = require("../../configs/mainConfig.json");
const coinSymbols:IConfig = require("../../configs/coinSymbols.json");

export interface IConfig {
    values: IConfigValue[];
}

interface IConfigValue {
    id: number;
    name: string;
    value: string;
    description?: string;
}

class AppConfig {
    getValueByName(name:string) {
        let index = mainConfig.values.findIndex(configValue => configValue.name==name);
        
        if (index == -1)
            throw new Error("Configuracion '"+ name +"' no especificado en el archivo de configuracion.");

        return mainConfig.values[index].value;
    }
    getCoinSymbolByName(name:string):string {
        let index = coinSymbols.values.findIndex(configValue => configValue.name===name);
        
        if (index == -1)
            throw new Error("Par '"+ name +"' no especificado en el archivo de configuracion.");
        
        return coinSymbols.values[index].value;
    }
    getCoinSymbolByID(id:number):string {
        let index = coinSymbols.values.findIndex(configValue => configValue.id===id);

        if (index == -1)
            throw new Error('ID '+id+' no especificado en el archivo de configuracion.');

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