import "reflect-metadata";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Hello, HelloProps } from "./components/Hello";
import { Foo } from "./domain/Foo";
import { TYPES } from "./types";
import { ContainerOperations } from "./ioc/ContainerOperations"; 
import Rx from 'rx';  


(function () {

    var evt;

    window['clockChanged'] = function (incomingJsonPayload) {
        evt = new CustomEvent('onClockChanged', { detail: incomingJsonPayload });
        window.dispatchEvent(evt);
    }

    var source = Rx.Observable.fromEvent(window, 'onClockChanged');

    var subscription = source.subscribe(
        function (x) {
            console.log('RX saw onClockChanged');
            console.log('RX x = ', x.detail);
        },
        function (err) {
            console.log('Error: %s', err);
        },
        function () {
            console.log('Completed');
        });

} ());




let foo = ContainerOperations.getInstance().container.get<Foo>(TYPES.Foo);

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