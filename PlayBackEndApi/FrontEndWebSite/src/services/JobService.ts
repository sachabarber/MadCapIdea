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

    storeUserIssuedJob = (job: any): void => {

        if (job == null || job == undefined)
            return;

        this._hasIssuedJob = true;
        sessionStorage.setItem('currentUserIssuedJob', JSON.stringify(job));
    }

    currentJob = (): any => {
        var currentUsersJob = JSON.parse(sessionStorage.getItem('currentUserIssuedJob'));
        return currentUsersJob;
    }

    hasIssuedJob = (): boolean => {
        return this._hasIssuedJob;
    }
}