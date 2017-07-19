import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../types";
import { Foo } from "../domain/Foo";
import { AuthService } from "../services/AuthService";


export class ContainerOperations {
    private static instance: ContainerOperations;
    private _container:Container = new Container();

    private constructor() {
        
    }

    static getInstance() {
        if (!ContainerOperations.instance) {
            ContainerOperations.instance = new ContainerOperations();
            ContainerOperations.instance.createInversifyContainer();
        }
        return ContainerOperations.instance;
    }

    private createInversifyContainer() {
        this.container.bind<number>(TYPES.SomeNumber).toConstantValue(22);
        this.container.bind<Foo>(TYPES.Foo).to(Foo);
        this.container.bind<AuthService>(TYPES.AuthService).to(AuthService);
    }

    public get container(): Container {
        return this._container;
    }
}