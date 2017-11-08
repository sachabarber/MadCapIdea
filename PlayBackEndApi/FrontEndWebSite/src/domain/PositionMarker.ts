import { Position } from "./Position";

export class PositionMarker {

    key: string;
    position: Position;
    name: string;
    email: string;
    icon: string;
    isDriver: boolean;
    jobForMarker: any;

    constructor(
        key: string,
        position: Position,
        name: string,
        email: string,
        icon: string,
        isDriver: boolean,
        jobForMarker: any) {

        this.key = key;
        this.position = position;
        this.name = name;
        this.email = email;
        this.icon = icon;
        this.isDriver = isDriver;

    }
}