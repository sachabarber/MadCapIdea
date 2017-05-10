import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello, Foo } from "./components/Hello";

ReactDOM.render(
    <div id="div1">
        <Hello compiler="TypeScript" framework="React" />
    </div>,
    document.getElementById("example")
);