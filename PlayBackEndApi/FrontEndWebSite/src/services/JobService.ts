import { injectable, inject } from "inversify";

@injectable()
export class JobService {

    private _hasIssuedJob: boolean;

    constructor() {
        this._hasIssuedJob = false;
    }

    clearUserIssuedJob = (email: string): void => {
        this._hasIssuedJob = false;
        let keyCurrentUserIssuedJob = 'currentUserIssuedJob_' + email;
        sessionStorage.removeItem(keyCurrentUserIssuedJob);

    }

    storeUserIssuedJob = (email: string, job: any): void => {

        if (email == null || email == undefined)
            return;

        if (job == null || job == undefined)
            return;

        this._hasIssuedJob = true;
        let keyCurrentUserIssuedJob = 'currentUserIssuedJob_' + email;
        sessionStorage.setItem(keyCurrentUserIssuedJob, JSON.stringify(job));
    }

    currentJob = (email: string): any => {
        let keyCurrentUserIssuedJob = 'currentUserIssuedJob_' + email;
        var currentUsersJob = JSON.parse(sessionStorage.getItem(keyCurrentUserIssuedJob));
        return currentUsersJob;
    }

    hasIssuedJob = (): boolean => {
        return this._hasIssuedJob;
    }
}