import { injectable, inject } from "inversify";
import { Position } from "../domain/Position";
import { PositionMarker } from "../domain/PositionMarker";
import { TYPES } from "../../src/types";
import { AuthService } from "./AuthService";


@injectable()
export class PositionService {

    private _authService: AuthService;

    constructor( @inject(TYPES.AuthService) authService: AuthService) {
        this._authService = authService;
    }

    clearUserJobPositions = (): void => {
        let keyCurrentUserJobPositions = 'currentUserJobPositions_' + this._authService.userEmail();
        sessionStorage.removeItem(keyCurrentUserJobPositions);
    }

    storeUserJobPositions = (jobPositions: Array<PositionMarker>): void => {

        if (jobPositions == null || jobPositions == undefined)
            return;

        let currentUsersJobPositions = {
            currentUser: this._authService.user(),
            jobPositions: jobPositions
        }
        let keyCurrentUserJobPositions = 'currentUserJobPositions_' + this._authService.userEmail();
        sessionStorage.setItem(keyCurrentUserJobPositions, JSON.stringify(currentUsersJobPositions));
    }

    userJobPositions = (): Array<PositionMarker> => {
        let keyCurrentUserJobPositions = 'currentUserJobPositions_' + this._authService.userEmail();
        var currentUserJobPositions = JSON.parse(sessionStorage.getItem(keyCurrentUserJobPositions));
        return currentUserJobPositions.jobPositions;
    }

    hasJobPositions = (): boolean => {
        let keyCurrentUserJobPositions = 'currentUserJobPositions_' + this._authService.userEmail();
        var currentUserJobPositions = JSON.parse(sessionStorage.getItem(keyCurrentUserJobPositions));
        return currentUserJobPositions != null && currentUserJobPositions != undefined;
    }

    clearUserPosition = (): void => {
        let keyCurrentUserPosition = 'currentUserPosition_' + this._authService.userEmail();
        sessionStorage.removeItem(keyCurrentUserPosition);
    }

    storeUserPosition = (position: Position): void => {

        if (position == null || position == undefined)
            return;

        let currentUsersPosition = {
            currentUser: this._authService.user(),
            position: position
        }
        let keyCurrentUserPosition = 'currentUserPosition_' + this._authService.userEmail();
        sessionStorage.setItem(keyCurrentUserPosition, JSON.stringify(currentUsersPosition));
    }

    currentPosition = (): Position => {
        let keyCurrentUserPosition = 'currentUserPosition_' + this._authService.userEmail();
        var currentUsersPosition = JSON.parse(sessionStorage.getItem(keyCurrentUserPosition));
        return currentUsersPosition.position;
    }

    hasPosition = (): boolean => {
        let keyCurrentUserPosition = 'currentUserPosition_' + this._authService.userEmail();
        var currentUsersPosition = JSON.parse(sessionStorage.getItem(keyCurrentUserPosition));
        return currentUsersPosition != null && currentUsersPosition != undefined;
    }
}