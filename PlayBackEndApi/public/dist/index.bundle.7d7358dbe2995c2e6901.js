webpackJsonp([2],{

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(21);

var ReactDOM = _interopRequireWildcard(_reactDom);

__webpack_require__(229);

var _reactBootstrap = __webpack_require__(230);

var _reactRouter = __webpack_require__(231);

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
        return React.createElement(_reactBootstrap.Navbar, { brand: 'React-Bootstrap' }, React.createElement(_reactBootstrap.Nav, null, React.createElement(_reactBootstrap.NavItem, { eventKey: 1, href: '#/' }, "Home"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/contact' }, "Contact"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/about' }, "About"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/redirecter' }, "Redirect")));
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
        return React.createElement("button", { onClick: this.handleClick, type: "button" }, "go to contact");
    };
    return ReDirecter;
}(React.Component);
var Home = function Home() {
    return React.createElement("div", null, React.createElement("h2", null, "Home"));
};
var Contact = function Contact() {
    return React.createElement("div", null, React.createElement("h2", null, "Contact"));
};
var About = function About() {
    return React.createElement("div", null, React.createElement("h2", null, "About"));
};
ReactDOM.render(React.createElement(_reactRouter.Router, { history: _reactRouter.hashHistory }, React.createElement(_reactRouter.Route, { component: App }, React.createElement(_reactRouter.Route, { path: "/", component: Home }), React.createElement(_reactRouter.Route, { path: "/contact", component: Contact }), React.createElement(_reactRouter.Route, { path: "/about", component: About }), React.createElement(_reactRouter.Route, { path: "/redirecter", component: ReDirecter }))), document.getElementById('root'));
//ReactDOM.render(
//    <MainNav/>,
//    document.getElementById('root')
//);

/***/ })

},[232]);
//# sourceMappingURL=index.bundle.7d7358dbe2995c2e6901.js.map