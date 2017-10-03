import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import Rx from 'rx';  

@injectable()
export class AuthService {

    private _isAuthenticated: boolean;
    private _authenticatedSubject = new Rx.Subject<boolean>();

    constructor() {

    }

    clearUser = () => {
        this._isAuthenticated = false;
        sessionStorage.removeItem('currentUserProfile');
        this._authenticatedSubject.onNext(false);
    }

    storeUser = (currentUser) => {

        if (currentUser == null || currentUser == undefined)
            return;

        this._isAuthenticated = true;
        sessionStorage.setItem('currentUserProfile', currentUser);
        this._authenticatedSubject.onNext(true);
    }

    userName = () => {
        var user = JSON.parse(sessionStorage.getItem('currentUserProfile'));
        return user.fullName;
    }

    userEmail = () => {
        var user = JSON.parse(sessionStorage.getItem('currentUserProfile'));
        return user.email;
    }

    isAuthenticated = () => {
        return this._isAuthenticated;
    }

    getAuthenticationStream = () => {
        return this._authenticatedSubject.asObservable();
    }
}
