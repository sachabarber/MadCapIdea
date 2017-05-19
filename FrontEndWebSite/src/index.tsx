import "reflect-metadata";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Container } from "inversify";
import { Hello, Foo, HelloProps } from "./components/Hello";
import { TYPES } from "./types";

const container = new Container();
container.bind<number>(TYPES.SomeNumber).toConstantValue(12);
container.bind<Foo>(TYPES.Foo).to(Foo);
let foo = container.get<Foo>(TYPES.Foo);

let helloProps = {
    compiler: "someCompilerXX",
    framework: "someFramework",
    foo: foo
};

let HelloComponent = React.createElement(Hello, helloProps, null)

ReactDOM.render(
    //React.createElement(Hello, helloProps, null),
    HelloComponent,
    document.getElementById('example')
);


//ReactDOM.render(
//    <div id="div1">
//        React.createElement(Hello, helloProps, null)
//    </div>,
//    document.getElementById("example")
//);