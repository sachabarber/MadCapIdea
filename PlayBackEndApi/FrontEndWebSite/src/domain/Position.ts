export class Position {

    //my JSON API prefers nice names
    latitude: number;
    longitude: number;

    //map component wants these abbreviated names
    lat: number;
    lng: number;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;

        //keep map happy
        this.lat = latitude;
        this.lng = longitude;
    }


    
}