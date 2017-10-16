import { injectable, inject } from "inversify";
import { Position } from "../domain/Position";

@injectable()
export class PositionService {

    constructor() {

    }

    clearUserPosition = (email: string): void => {
        let key = 'currentUserPosition_' + email;
        sessionStorage.removeItem(key);
    }

    storeUserPosition = (currentUser: any, position: Position): void => {

        if (currentUser == null || currentUser == undefined)
            return;

        if (position == null || position == undefined)
            return;

        let currentUsersPosition = {
            currentUser: currentUser,
            position: position
        }
        let key = 'currentUserPosition_' + currentUser.email;
        sessionStorage.setItem(key, JSON.stringify(currentUsersPosition));
    }

    currentPosition = (email: string): Position => {
        let key = 'currentUserPosition_' + email;
        var currentUsersPosition = JSON.parse(sessionStorage.getItem(key));
        return currentUsersPosition.position;
    }

    hasPosition = (email: string): boolean => {
        let key = 'currentUserPosition_' + email;
        var currentUsersPosition = JSON.parse(sessionStorage.getItem(key));
        return currentUsersPosition != null && currentUsersPosition != undefined;
    }
}