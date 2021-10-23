import { IAlarms, IAlarm } from '../models/models';
import { appConfig } from '../models/models';

const alarmBuffer:number | string = appConfig.getValueByName("alarmBuffer");


class AlarmRepositorie {
    
    getTopAlarmList(price:number):IAlarms {
        let mockTopAlarms:IAlarms = {values:[]};
        let alarm:IAlarm;

        for (let i = 0;i < alarmBuffer;i++) {
            alarm = {
                alarm: price+(1+i)*10.0,
                symbolId: 1,
                userId: 1
            }

            mockTopAlarms.values.push(alarm);
        }
        return mockTopAlarms;
    }
    getBottomAlarmList(price:number):IAlarms {
        let mockTopAlarms:IAlarms = {values:[]};
        let alarm:IAlarm;

        for (let i = 0;i < alarmBuffer;i++) {
            alarm = {
                alarm: price-(i+1)*10.0,
                symbolId: 1,
                userId: 1
            }

            mockTopAlarms.values.push(alarm);
        }
        return mockTopAlarms;
    }
}

export default new AlarmRepositorie();