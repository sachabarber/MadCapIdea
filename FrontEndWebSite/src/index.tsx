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
let HelloComponent2 = React.createElement(Hello, helloProps, null)


var HelloHolder = React.createClass({
    render: function () {
        return (
            <div>
                <Hello compiler="TypeScript" framework="React" foo={foo} />
                {HelloComponent}
                {HelloComponent2}
            </div>
        )
    }
});



ReactDOM.render(
    //React.createElement(Hello, helloProps, null),
    <div>
        <HelloHolder/>
    </div>,
    document.getElementById('example')
);


//ReactDOM.render(
//    <div id="div1">
//        React.createElement(Hello, helloProps, null)
//    </div>,
//    document.getElementById("example")
//);