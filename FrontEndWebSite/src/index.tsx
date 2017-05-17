import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello, Foo, HelloProps } from "./components/Hello";

let foo = new Foo(12);
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