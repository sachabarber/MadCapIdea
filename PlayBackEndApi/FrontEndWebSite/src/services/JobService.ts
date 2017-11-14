import { injectable, inject } from "inversify";
import { TYPES } from "../../src/types";
import { AuthService } from "./AuthService";


@injectable()
export class JobService {

    private _hasIssuedJob: boolean;
    private _authService: AuthService;

    constructor(@inject(TYPES.AuthService) authService: AuthService) {
        this._hasIssuedJob = false;
        this._authService = authService;
    }

    clearUserIssuedJob = (): void => {
        this._hasIssuedJob = false;
        let keyCurrentUserIssuedJob = 'currentUserIssuedJob_' + this._authService.userEmail();
        sessionStorage.removeItem(keyCurrentUserIssuedJob);

    }

    storeUserIssuedJob = (job: any): void => {

        if (job == null || job == undefined)
            return;

        this._hasIssuedJob = true;
        let keyCurrentUserIssuedJob = 'currentUserIssuedJob_' + this._authService.userEmail();
        sessionStorage.setItem(keyCurrentUserIssuedJob, JSON.stringify(job));
    }

    currentJob = (): any => {
        let keyCurrentUserIssuedJob = 'currentUserIssuedJob_' + this._authService.userEmail();
        var currentUsersJob = JSON.parse(sessionStorage.getItem(keyCurrentUserIssuedJob));
        return currentUsersJob;
    }

    hasIssuedJob = (): boolean => {
        return this._hasIssuedJob;
    }
}