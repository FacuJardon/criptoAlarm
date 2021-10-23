export interface IAlarms {
    values:IAlarm[];
}


export interface IAlarm {
    userId:number;
    symbolId: number;
    alarm: number;
}