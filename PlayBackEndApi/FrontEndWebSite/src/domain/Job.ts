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
}