import { injectable, inject } from "inversify";
import { JobEventArgs } from "../domain/JobEventArgs";
import Rx from 'rx';

@injectable()
export class JobStreamService {

    private _jobSourceObservable: Rx.Observable<any>;

    constructor() {

    }

    init = (): void => {

        window['jobChanged'] = function (incomingJsonPayload: any) {
            let evt = new CustomEvent('onJobChanged', new JobEventArgs(incomingJsonPayload));
            window.dispatchEvent(evt);
        }

        this._jobSourceObservable = Rx.Observable.fromEvent(window, 'onJobChanged');
    }

    getJobStream = (): Rx.Observable<any> => {
        return this._jobSourceObservable;
    }
}