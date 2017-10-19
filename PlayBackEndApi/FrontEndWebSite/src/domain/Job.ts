export class Job {

    clientFullName: string;
    clientEmail: string;
    driverFullName: string;
    driverEmail: string;
    vehicleDescription: string;
    vehicleRegistrationNumber: string;
    isAssigned: boolean;
    isCompleted: boolean;

    constructor(
        clientFullName: string,
        clientEmail: string,
        driverFullName: string,
        driverEmail: string,
        vehicleDescription: string,
        vehicleRegistrationNumber: string,
        isAssigned: boolean,
        isCompleted: boolean) {

        this.clientFullName = clientFullName;
        this.clientEmail = clientEmail;
        this.driverFullName = driverFullName;
        this.driverEmail = driverEmail;
        this.vehicleDescription = vehicleDescription;
        this.vehicleRegistrationNumber = vehicleRegistrationNumber;
        this.isAssigned = isAssigned;
        this.isCompleted = isCompleted;
    }

    static getJobUUID = (): string => {
        let s = Array<any>(36);
        let hexDigits: string = "0123456789abcdef";
        for (var i: number = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = "4";  
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
        s[8] = s[13] = s[18] = s[23] = "-";
        let uuid: string = s.join("");
        return uuid;
    }
}