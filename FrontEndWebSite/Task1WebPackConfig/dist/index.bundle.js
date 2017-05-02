webpackJsonp([1],{

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(50);
var Foo = function () {
    function Foo(num) {
        this._num = num;
    }
    Foo.prototype.getNum = function () {
        return this._num * 2;
    };
    return Foo;
}();
exports.Foo = Foo;
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
var Hello = function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.render = function () {
        var foo = new Foo(12);
        var x = foo.getNum();
        console.log("Foo should be 24");
        console.log(x);
        var foo2 = new Foo(20);
        var x2 = foo2.getNum();
        console.log("Foo should be 40");
        console.log(x2);
        var foo3 = new Foo(40);
        var x3 = foo3.getNum();
        console.log("Foo should be 80");
        console.log(x3);
        return React.createElement("h1", null, "Hello from ", this.props.compiler, " and ", this.props.framework, "!");
    };
    return Hello;
}(React.Component);
exports.Hello = Hello;

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(50);
var ReactDOM = __webpack_require__(82);
var Hello_1 = __webpack_require__(81);
ReactDOM.render(React.createElement(Hello_1.Hello, { compiler: "TypeScript", framework: "React" }), document.getElementById("example"));

/***/ })

},[83]);
//# sourceMappingURL=index.bundle.js.map