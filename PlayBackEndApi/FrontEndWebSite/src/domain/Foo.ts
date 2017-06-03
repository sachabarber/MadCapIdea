import { injectable, inject } from "inversify";
import { TYPES } from "../types";

@injectable()
export class Foo {

    private _num: number;

    constructor(@inject(TYPES.SomeNumber) num: number) {
        this._num = num;
    }

    getNum() {
        return this._num * 2;
    }

}
