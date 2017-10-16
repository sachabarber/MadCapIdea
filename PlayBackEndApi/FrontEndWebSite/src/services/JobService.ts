import { injectable, inject } from "inversify";

@injectable()
export class JobService {

    private _hasIssuedJob: boolean;

    constructor() {
        this._hasIssuedJob = false;
    }

    clearUserIssuedJob = (): void => {
        this._hasIssuedJob = false;
        sessionStorage.removeItem('currentUserIssuedJob');
    }

    storeUserIssuedJob = (currentUser: any, job: any): void => {

        if (currentUser == null || currentUser == undefined)
            return;

        if (job == null || job == undefined)
            return;

        this._hasIssuedJob = true;
        let currentUsersJob = {
            currentUser: currentUser,
            currentJob: job
        }
        sessionStorage.setItem('currentUserIssuedJob', JSON.stringify(currentUsersJob));
    }

    currentJob = (): any => {
        var currentUsersJob = JSON.parse(sessionStorage.getItem('currentUserIssuedJob'));
        return currentUsersJob;
    }

    hasIssuedJob = (): boolean => {
        return this._hasIssuedJob;
    }
}