import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import Rx from 'rx';

@injectable()
export class AuthService {

    private _isAuthenticated: boolean;
    private _authenticatedSubject = new Rx.Subject<boolean>();

    constructor() {

    }

    clearUser = (): void => {
        this._isAuthenticated = false;
        sessionStorage.removeItem('currentUserProfile');
        this._authenticatedSubject.onNext(false);
    }

    storeUser = (currentProfile: any): void => {

        if (currentProfile == null || currentProfile == undefined)
            return;

        this._isAuthenticated = true;
        sessionStorage.setItem('currentUserProfile', JSON.stringify(currentProfile));
        this._authenticatedSubject.onNext(true);
    }

    userName = (): string => {
        var userProfile = JSON.parse(sessionStorage.getItem('currentUserProfile'));
        return userProfile.user.fullName;
    }

    user = (): any => {
        var userProfile = JSON.parse(sessionStorage.getItem('currentUserProfile'));
        return userProfile.user;
    }

    userEmail = (): string => {
        var userProfile = JSON.parse(sessionStorage.getItem('currentUserProfile'));
        return userProfile.user.email;
    }

    isDriver = (): boolean => {
        var userProfile = JSON.parse(sessionStorage.getItem('currentUserProfile'));
        return userProfile.isDriver;
    }

    isAuthenticated = (): boolean => {
        return this._isAuthenticated;
    }

    getAuthenticationStream = (): Rx.Observable<boolean> => {
        return this._authenticatedSubject.asObservable();
    }
}