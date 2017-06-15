webpackJsonp([1],{

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Login = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(145);

var _reactBootstrap = __webpack_require__(89);

var _reactBootstrapValidation = __webpack_require__(369);

var _revalidator = __webpack_require__(537);

var _revalidator2 = _interopRequireDefault(_revalidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var schema = {
    properties: {
        email: {
            type: 'string',
            maxLength: 255,
            format: 'email',
            required: true,
            allowEmpty: false
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 60,
            required: true,
            allowEmpty: false
        }
    }
};
var Login = function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Login.prototype.render = function () {
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrapValidation.Form, { className: "submitable-form",
            // Supply callbacks to both valid and invalid
            // submit attempts
            validateAll: this._validateForm.bind(this), onValidSubmit: this._onSubmit.bind(this) }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Please enter your details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', name: 'password', label: 'Password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "loginBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Login"))))));
    };
    Login.prototype._validateForm = function (values) {
        var res = _revalidator2.default.validate(values, schema);
        // If the values passed validation, we return true
        if (res.valid) {
            return true;
        }
        // Otherwise we should return an object containing errors
        // e.g. { email: true, password: true }
        return res.errors.reduce(function (errors, error) {
            // Set each property to either true or
            // a string error description
            errors[error.property] = true;
            return errors;
        }, {});
    };
    Login.prototype._onSubmit = function () {
        alert("Form may be submitted");
    };
    return Login;
}(React.Component);
exports.Login = Login;

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(17);

var ReactDOM = _interopRequireWildcard(_reactDom);

__webpack_require__(145);

var _reactBootstrap = __webpack_require__(89);

var _reactRouter = __webpack_require__(260);

var _Login = __webpack_require__(259);

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

var MainNav = function (_super) {
    __extends(MainNav, _super);
    function MainNav() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainNav.prototype.render = function () {
        return React.createElement(_reactBootstrap.Navbar, null, React.createElement(_reactBootstrap.Nav, null, React.createElement(_reactBootstrap.NavItem, { eventKey: 1, href: '#/' }, "Login"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/contact' }, "Contact"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/about' }, "About"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/redirecter' }, "Redirect")));
    };
    return MainNav;
}(React.Component);
var App = function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return React.createElement("div", null, React.createElement(MainNav, null), this.props.children);
    };
    return App;
}(React.Component);
var ReDirecter = function (_super) {
    __extends(ReDirecter, _super);
    function ReDirecter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            _reactRouter.hashHistory.push('/contact');
        };
        return _this;
    }
    ReDirecter.prototype.render = function () {
        return React.createElement(_reactBootstrap.Button, { bsStyle: "primary", bsSize: "large", onClick: this.handleClick }, "Go to Contact");
    };
    return ReDirecter;
}(React.Component);
var Contact = function Contact() {
    return React.createElement("div", null, React.createElement("h2", null, "Contact"));
};
var About = function About() {
    return React.createElement("div", null, React.createElement("h2", null, "About"));
};
ReactDOM.render(React.createElement(_reactRouter.Router, { history: _reactRouter.hashHistory }, React.createElement(_reactRouter.Route, { component: App }, React.createElement(_reactRouter.Route, { path: "/", component: _Login.Login }), React.createElement(_reactRouter.Route, { path: "/contact", component: Contact }), React.createElement(_reactRouter.Route, { path: "/about", component: About }), React.createElement(_reactRouter.Route, { path: "/redirecter", component: ReDirecter }))), document.getElementById('root'));

/***/ })

},[261]);
//# sourceMappingURL=index.bundle.26bcadac4826638ff4c2.js.map