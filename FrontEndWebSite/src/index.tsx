import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello, Foo } from "./components/Hello";

let foo = new Foo(12);

ReactDOM.render(
    <div id="div1">
        <Hello compiler="TypeScript" framework="React" foo={foo} />
    </div>,
    document.getElementById("example")
);