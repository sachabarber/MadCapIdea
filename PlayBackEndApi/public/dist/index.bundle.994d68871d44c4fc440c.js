webpackJsonp([1],{

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Foo = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inversify = __webpack_require__(162);

var _types = __webpack_require__(88);

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = undefined && undefined.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};

var Foo = function () {
    function Foo(num) {
        this._num = num;
    }
    Foo.prototype.getNum = function () {
        return this._num * 2;
    };
    return Foo;
}();
exports.Foo = Foo = __decorate([(0, _inversify.injectable)(), __param(0, (0, _inversify.inject)(_types.TYPES.SomeNumber)), __metadata("design:paramtypes", [Number])], Foo);
exports.Foo = Foo;

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Hello = undefined;

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _lodash = __webpack_require__(330);

var _ = _interopRequireWildcard(_lodash);

var _reactBootstrap = __webpack_require__(392);

__webpack_require__(225);

var _Foo = __webpack_require__(138);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
var Hello = function (_super) {
    __extends(Hello, _super);
    function Hello(props) {
        var _this = _super.call(this, props) || this;
        console.log(_this.props); // prints out whatever is inside props
        return _this;
    }
    Hello.prototype.render = function () {
        console.log("jquery");
        console.log($);
        console.log($.fn.jquery);
        var foo = new _Foo.Foo(222);
        var x = foo.getNum();
        console.log("Foo should be 444");
        console.log(x);
        console.log("lodash version");
        console.log(_.VERSION);
        var foo2 = new _Foo.Foo(20);
        var x2 = foo2.getNum();
        console.log("Foo should be 40");
        console.log(x2);
        var foo3 = new _Foo.Foo(40);
        var x3 = foo3.getNum();
        console.log("Foo should be 80");
        console.log(x3);
        return React.createElement("div", null, React.createElement(_reactBootstrap.Button, { bsStyle: "primary", bsSize: "large" }, "Large button"), React.createElement("h1", { id: "helloText" }, "Hello from ", this.props.compiler, " and ", this.props.framework, " fooZZ = ", this.props.foo.getNum(), "!"));
    };
    return Hello;
}(React.Component);
exports.Hello = Hello;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(136)))

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContainerOperations = undefined;

__webpack_require__(137);

var _inversify = __webpack_require__(162);

var _types = __webpack_require__(88);

var _Foo = __webpack_require__(138);

var ContainerOperations = function () {
    function ContainerOperations() {
        this._container = new _inversify.Container();
    }
    ContainerOperations.getInstance = function () {
        if (!ContainerOperations.instance) {
            ContainerOperations.instance = new ContainerOperations();
            ContainerOperations.instance.createInversifyContainer();
        }
        return ContainerOperations.instance;
    };
    ContainerOperations.prototype.createInversifyContainer = function () {
        this.container.bind(_types.TYPES.SomeNumber).toConstantValue(22);
        this.container.bind(_types.TYPES.Foo).to(_Foo.Foo);
    };
    Object.defineProperty(ContainerOperations.prototype, "container", {
        get: function get() {
            return this._container;
        },
        enumerable: true,
        configurable: true
    });
    return ContainerOperations;
}();
exports.ContainerOperations = ContainerOperations;

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

__webpack_require__(137);

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(20);

var ReactDOM = _interopRequireWildcard(_reactDom);

var _Hello = __webpack_require__(221);

var _types = __webpack_require__(88);

var _ContainerOperations = __webpack_require__(222);

var _rx = __webpack_require__(223);

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function () {
    var evt;
    console.log("xxxxxxxxxxxxx inside self executing function");
    window['clockChanged'] = function (incomingJsonPayload) {
        evt = new CustomEvent('onClockChanged', { detail: incomingJsonPayload });
        $('#clock').html('<span>' + JSON.stringify(incomingJsonPayload) + '</span>');
        window.dispatchEvent(evt);
    };
    var source = _rx2.default.Observable.fromEvent(window, 'onClockChanged');
    var subscription = source.subscribe(function (x) {
        console.log('RX saw onClockChanged');
        console.log('RX x = ', x.detail);
    }, function (err) {
        console.log('Error: %s', err);
    }, function () {
        console.log('Completed');
    });
})();
var foo = _ContainerOperations.ContainerOperations.getInstance().container.get(_types.TYPES.Foo);
var helloProps = {
    compiler: "someCompilerXX",
    framework: "someFramework",
    foo: foo
};
var HelloComponent = React.createElement(_Hello.Hello, helloProps, null);
var HelloComponent2 = React.createElement(_Hello.Hello, helloProps, null);
var HelloHolder = React.createClass({
    displayName: "HelloHolder",

    render: function render() {
        return React.createElement("div", null, React.createElement(_Hello.Hello, { compiler: "TypeScript", framework: "React", foo: foo }), HelloComponent, HelloComponent2);
    }
});
ReactDOM.render(
//React.createElement(Hello, helloProps, null),
React.createElement("div", null, React.createElement(HelloHolder, null)), document.getElementById('example'));
//ReactDOM.render(
//    <div id="div1">
//        React.createElement(Hello, helloProps, null)
//    </div>,
//    document.getElementById("example")
//);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(136)))

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var TYPES = exports.TYPES = {
    Foo: Symbol("Foo"),
    SomeNumber: Symbol("SomeNumber")
};

/***/ })

},[224]);
//# sourceMappingURL=index.bundle.994d68871d44c4fc440c.js.map