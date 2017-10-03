import { injectable, inject } from "inversify";

@injectable()
export class JobService {

    private _hasIssuedJob: boolean;
    
    constructor() {
        this._hasIssuedJob = false;
    }

    clearUserIssuedJob = () => {
        this._hasIssuedJob = false;
        sessionStorage.removeItem('currentUserIssuedJob');
    }

    storeUserIssuedJob = (currentUser, job) => {

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

    currentJob = () => {
        var currentUsersJob = JSON.parse(sessionStorage.getItem('currentUserIssuedJob'));
        return currentUsersJob;
    }

    hasIssuedJob = () => {
        return this._hasIssuedJob;
    }
}
