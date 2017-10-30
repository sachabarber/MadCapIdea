import { injectable, inject } from "inversify";
import { Position } from "../domain/Position";
import { PositionMarker } from "../domain/PositionMarker";


@injectable()
export class PositionService {

    //markers: Array<PositionMarker>;

    constructor() {

    }

   


    clearUserJobPositions = (email: string): void => {
        let keyCurrentUserJobPositions = 'currentUserJobPositions_' + email;
        sessionStorage.removeItem(keyCurrentUserJobPositions);
    }

    storeUserJobPositions = (currentUser: any, jobPositions: Array<PositionMarker>): void => {

        if (currentUser == null || currentUser == undefined)
            return;

        if (jobPositions == null || jobPositions == undefined)
            return;

        let currentUsersJobPositions = {
            currentUser: currentUser,
            jobPositions: jobPositions
        }
        let keyCurrentUserJobPositions = 'currentUserJobPositions_' + currentUser.email;
        sessionStorage.setItem(keyCurrentUserJobPositions, JSON.stringify(currentUsersJobPositions));
    }

    userJobPositions = (email: string): Array<PositionMarker> => {
        let keyCurrentUserJobPositions = 'currentUserJobPositions_' + email;
        var currentUserJobPositions = JSON.parse(sessionStorage.getItem(keyCurrentUserJobPositions));
        return currentUserJobPositions.jobPositions;
    }

    hasJobPositions = (email: string): boolean => {
        let keyCurrentUserJobPositions = 'currentUserJobPositions_' + email;
        var currentUserJobPositions = JSON.parse(sessionStorage.getItem(keyCurrentUserJobPositions));
        return currentUserJobPositions != null && currentUserJobPositions != undefined;
    }

    clearUserPosition = (email: string): void => {
        let keyCurrentUserPosition = 'currentUserPosition_' + email;
        sessionStorage.removeItem(keyCurrentUserPosition);
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
        let keyCurrentUserPosition = 'currentUserPosition_' + currentUser.email;
        sessionStorage.setItem(keyCurrentUserPosition, JSON.stringify(currentUsersPosition));
    }

    currentPosition = (email: string): Position => {
        let keyCurrentUserPosition = 'currentUserPosition_' + email;
        var currentUsersPosition = JSON.parse(sessionStorage.getItem(keyCurrentUserPosition));
        return currentUsersPosition.position;
    }

    hasPosition = (email: string): boolean => {
        let keyCurrentUserPosition = 'currentUserPosition_' + email;
        var currentUsersPosition = JSON.parse(sessionStorage.getItem(keyCurrentUserPosition));
        return currentUsersPosition != null && currentUsersPosition != undefined;
    }
}