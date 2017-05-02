"use strict";
/// <reference path="~/node_modules/@types/react/index.d.ts" />
/// <reference path="~/node_modules/@types/react-dom/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Hello_1 = require("./components/Hello");
ReactDOM.render(React.createElement(Hello_1.Hello, { compiler: "TypeScript", framework: "React" }), document.getElementById("example"));
//# sourceMappingURL=index.js.map