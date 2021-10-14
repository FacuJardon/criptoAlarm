const appConfig:IConfig = require("../../config.json");

export interface IConfig {
    values: IConfigValue[];
}

interface IConfigValue {
    name: string;
    value: string;
}

class AppConfig {
    getValueByName(name:string) {
        let index = appConfig.values.findIndex(configValue => configValue.name==name);
        return appConfig.values[index].value;
    }
}

export default new AppConfig();