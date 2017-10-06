webpackJsonp([1],{

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var TYPES = exports.TYPES = {
    Foo: Symbol("Foo"),
    SomeNumber: Symbol("SomeNumber"),
    AuthService: Symbol("AuthService"),
    JobService: Symbol("JobService")
};

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YesNoDialog = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

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

var YesNoDialog = function (_super) {
    __extends(YesNoDialog, _super);
    function YesNoDialog(props) {
        var _this = _super.call(this, props) || this;
        _this._yesClicked = function () {
            _this.setState({ showModal: false });
            _this.props.yesCallBack();
        };
        _this._noClicked = function () {
            _this.setState({ showModal: false });
            _this.props.noCallBack();
        };
        _this._close = function () {
            _this.setState({ showModal: false });
        };
        _this._open = function () {
            _this.setState({ showModal: true });
        };
        console.log(_this.props);
        //set initial state
        _this.state = {
            showModal: false
        };
        return _this;
    }
    YesNoDialog.prototype.render = function () {
        return React.createElement("div", { className: "leftFloat" }, React.createElement(_reactBootstrap.Button, { id: this.props.theId, type: 'button', bsSize: 'small', bsStyle: 'primary', onClick: this._open }, this.props.launchButtonText), React.createElement(_reactBootstrap.Modal, { show: this.state.showModal, onHide: this._close }, React.createElement(_reactBootstrap.Modal.Header, { closeButton: true }, React.createElement(_reactBootstrap.Modal.Title, null, this.props.headerText)), React.createElement(_reactBootstrap.Modal.Body, null, React.createElement("h4", null, "Are you sure?")), React.createElement(_reactBootstrap.Modal.Footer, null, React.createElement(_reactBootstrap.Button, { type: 'button', bsSize: 'small', bsStyle: 'primary', onClick: this._yesClicked }, "Yes"), React.createElement(_reactBootstrap.Button, { type: 'button', bsSize: 'small', bsStyle: 'danger', onClick: this._noClicked }, "Cancel"))));
    };
    return YesNoDialog;
}(React.Component);
exports.YesNoDialog = YesNoDialog;

/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CreateJob = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactMeasure = __webpack_require__(388);

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactRouter = __webpack_require__(57);

var _reactGoogleMaps = __webpack_require__(387);

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

var STYLES = {
    overlayView: {
        background: "white",
        border: "1px solid #ccc",
        padding: 15
    },
    icon: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20
    }
};
var GetPixelPositionOffset = function GetPixelPositionOffset(width, height) {
    return { x: -(width / 2), y: -(height / 2) };
};
var CreateJobGoogleMap = (0, _reactGoogleMaps.withGoogleMap)(function (props) {
    return React.createElement(_reactGoogleMaps.GoogleMap, { ref: props.onMapLoad, defaultZoom: 16, defaultCenter: { lat: 50.8202949, lng: -0.1406958 }, onClick: props.onMapClick }, React.createElement(_reactGoogleMaps.OverlayView, { key: 'createJobKey', mapPaneName: _reactGoogleMaps.OverlayView.OVERLAY_MOUSE_TARGET, position: props.currentPosition, getPixelPositionOffset: GetPixelPositionOffset }, React.createElement("div", { style: STYLES.overlayView }, React.createElement("img", { style: STYLES.icon, src: '/assets/images/passenger.png' }), React.createElement("br", null), React.createElement(_reactBootstrap.Button, { type: 'button', bsSize: 'xsmall', bsStyle: 'primary', onClick: function onClick() {
            return props.onMarkerClick();
        }, value: 'Create Job' }, "Create Job"))));
});
var CreateJob = function (_super) {
    __extends(CreateJob, _super);
    function CreateJob(props) {
        var _this = _super.call(this, props) || this;
        _this._handleMarkerClick = function () {
            console.log('button on CreateJob overlay clicked https://github.com/souporserious/react-measure for map');
        };
        _this._handleMapLoad = function (map) {
            if (map) {
                console.log(map.getZoom());
            }
        };
        _this._handleMapClick = function (event) {
            var newState = Object.assign({}, _this.state, {
                currentPosition: event.latLng
            });
            _this.setState(newState);
        };
        _this._jobService = props.route.jobService;
        _this._authService = props.route.authService;
        console.log("CreateJob ctor");
        console.log(_this._jobService);
        if (!_this._authService.isAuthenticated()) {
            _reactRouter.hashHistory.push('/');
        }
        _this.state = {
            currentPosition: { lat: 50.8202949, lng: -0.1406958 },
            dimensions: { width: -1, height: -1 }
        };
        return _this;
    }
    CreateJob.prototype.render = function () {
        var _this = this;
        var adjustedwidth = this.state.dimensions.width;
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "SET YOUR CURRENT LOCATION"), React.createElement("h6", null, "Click the map to set your current location"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactMeasure2.default, { bounds: true, onResize: function onResize(contentRect) {
                _this.setState({ dimensions: contentRect.bounds });
            } }, function (_a) {
            var measureRef = _a.measureRef;
            return React.createElement("div", { ref: measureRef }, React.createElement(CreateJobGoogleMap, { containerElement: React.createElement("div", { style: {
                        position: 'relative',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: { adjustedwidth: adjustedwidth },
                        height: 600,
                        marginTop: 20,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 20
                    } }), mapElement: React.createElement("div", { style: {
                        position: 'relative',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: { adjustedwidth: adjustedwidth },
                        height: 600,
                        marginTop: 20,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 20
                    } }), onMapLoad: _this._handleMapLoad, onMapClick: _this._handleMapClick, currentPosition: _this.state.currentPosition, onMarkerClick: _this._handleMarkerClick }));
        })))));
    };
    return CreateJob;
}(React.Component);
exports.CreateJob = CreateJob;

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Login = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _OkDialog = __webpack_require__(74);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactBootstrapValidation = __webpack_require__(203);

var _revalidator = __webpack_require__(239);

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
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this._validateForm = function (values) {
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
        _this._handleInvalidSubmit = function (errors, values) {
            console.log(values);
            // Errors is an array containing input names
            // that failed to validate
            _this.setState({
                okDialogHeaderText: 'Validation Error',
                okDialogBodyText: 'Form has errors and may not be submitted',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this._handleValidSubmit = function (values) {
            var logindetails = values;
            var self = _this;
            $.ajax({
                type: 'POST',
                url: 'login/validate',
                data: JSON.stringify(logindetails),
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            }).done(function (jdata, textStatus, jqXHR) {
                console.log("result of login");
                console.log(jqXHR.responseText);
                var currentUser = jqXHR.responseText;
                self._authService.storeUser(currentUser);
                self.setState({
                    okDialogHeaderText: 'Login Successful',
                    okDialogBodyText: 'You are now logged in',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                self.setState({
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: jqXHR.responseText,
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            });
        };
        _this._okDialogCallBack = function () {
            _this.setState({
                okDialogOpen: false
            });
        };
        console.log(props);
        _this._authService = props.route.authService;
        _this.state = {
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0
        };
        return _this;
    }
    Login.prototype.render = function () {
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrapValidation.Form
        // Supply callbacks to both valid and invalid
        // submit attempts
        , {
            // Supply callbacks to both valid and invalid
            // submit attempts
            validateAll: this._validateForm, onInvalidSubmit: this._handleInvalidSubmit, onValidSubmit: this._handleValidSubmit }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "ENTER YOUR LOGIN DETAILS"), React.createElement("span", null, React.createElement("h6", null, "Or click ", React.createElement("a", { href: "#/register" }, "here"), " to register")))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', name: 'password', label: 'Password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'checkbox', name: 'isDriver', label: 'Are you a driver?' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "loginBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Login"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this._okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey }))))));
    };
    return Login;
}(React.Component);
exports.Login = Login;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(122)))

/***/ }),

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Logout = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactRouter = __webpack_require__(57);

var _OkDialog = __webpack_require__(74);

var _YesNoDialog = __webpack_require__(240);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

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

var Logout = function (_super) {
    __extends(Logout, _super);
    function Logout(props) {
        var _this = _super.call(this, props) || this;
        _this._okDialogCallBack = function () {
            _this.setState({
                okDialogOpen: false
            });
        };
        _this._logoutYesCallBack = function () {
            _this._authService.clearUser();
            _this.setState({
                okDialogHeaderText: 'Logout',
                okDialogBodyText: 'You have been logged out',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
            _reactRouter.hashHistory.push('/');
        };
        _this._logoutNoCallBack = function () {};
        console.log(props);
        _this._authService = props.route.authService;
        if (!_this._authService.isAuthenticated()) {
            _reactRouter.hashHistory.push('/');
        }
        _this.state = {
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0
        };
        return _this;
    }
    Logout.prototype.render = function () {
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, React.createElement("span", null, "YOU ARE CURRENTLY LOGGED IN AS [", this._authService.userName(), "]")), React.createElement("span", null, React.createElement("h6", null, "Click the button to logout")))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_YesNoDialog.YesNoDialog, { theId: "logoutBtn", launchButtonText: "Logout", yesCallBack: this._logoutYesCallBack, noCallBack: this._logoutNoCallBack, headerText: "Confirm logout" }), React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this._okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return Logout;
}(React.Component);
exports.Logout = Logout;

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Register = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _PassengerRegistration = __webpack_require__(419);

var _DriverRegistration = __webpack_require__(418);

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

var Register = function (_super) {
    __extends(Register, _super);
    function Register(props) {
        var _this = _super.call(this, props) || this;
        _this._authService = props.route.authService;
        _this.state = {
            option: 'passenger'
        };
        return _this;
    }
    Register.prototype.render = function () {
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "PLEASE ENTER YOUR REGISTRATION DETAILS"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h6", null, "Choose your registration type "))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonGroup, null, React.createElement(_reactBootstrap.Button, { bsSize: 'small', onClick: this._onOptionChange.bind(this, 'passenger'), active: this.state.option === 'passenger' }, "Passenger"), React.createElement(_reactBootstrap.Button, { bsSize: 'small', onClick: this._onOptionChange.bind(this, 'driver'), active: this.state.option === 'driver' }, "Driver")))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, this.state.option === 'passenger' ? React.createElement("div", null, React.createElement(_PassengerRegistration.PassengerRegistration, { authService: this._authService })) : React.createElement("div", null, React.createElement(_DriverRegistration.DriverRegistration, { authService: this._authService }))))));
    };
    Register.prototype._onOptionChange = function (option) {
        this.setState({
            option: option
        });
    };
    return Register;
}(React.Component);
exports.Register = Register;

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ViewJob = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactMeasure = __webpack_require__(388);

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _RatingDialog = __webpack_require__(420);

var _YesNoDialog = __webpack_require__(240);

var _OkDialog = __webpack_require__(74);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactRouter = __webpack_require__(57);

var _reactGoogleMaps = __webpack_require__(387);

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

var STYLES = {
    overlayView: {
        background: "white",
        border: "1px solid #ccc",
        padding: 15
    }
};
var GetPixelPositionOffset = function GetPixelPositionOffset(width, height) {
    return { x: -(width / 2), y: -(height / 2) };
};
var ViewJobGoogleMap = (0, _reactGoogleMaps.withGoogleMap)(function (props) {
    return React.createElement(_reactGoogleMaps.GoogleMap, { ref: props.onMapLoad, defaultZoom: 14, defaultCenter: { lat: 50.8202949, lng: -0.1406958 } }, props.markers.map(function (marker, index) {
        return React.createElement(_reactGoogleMaps.OverlayView, { key: marker.key, mapPaneName: _reactGoogleMaps.OverlayView.OVERLAY_MOUSE_TARGET, position: marker.position, getPixelPositionOffset: GetPixelPositionOffset }, React.createElement("div", { style: STYLES.overlayView }, React.createElement("img", { src: marker.icon }), React.createElement("strong", null, marker.key), React.createElement("br", null), React.createElement(_reactBootstrap.Button, { type: 'button', bsSize: 'xsmall', bsStyle: 'primary', onClick: function onClick() {
                return props.onMarkerClick(marker);
            }, value: 'Accept' }, "Accept")));
    }));
});
var ViewJob = function (_super) {
    __extends(ViewJob, _super);
    function ViewJob(props) {
        var _this = _super.call(this, props) || this;
        _this._handleMarkerClick = function (targetMarker) {
            console.log('button on overlay clicked:' + targetMarker.key);
        };
        _this._ratingsDialogOkCallBack = function () {
            console.log('RATINGS OK CLICKED');
            _this.setState({
                okDialogHeaderText: 'Ratings',
                okDialogBodyText: 'Rating successfully recorded',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this._jobCancelledCallBack = function () {
            console.log('YES CLICKED');
            _this.setState({
                okDialogHeaderText: 'Job Cancellaton',
                okDialogBodyText: 'Job successfully cancelled',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this._jobNotCancelledCallBack = function () {
            console.log('NO CLICKED');
            _this.setState({
                okDialogHeaderText: 'Job Cancellaton',
                okDialogBodyText: 'Job remains open',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this._okDialogCallBack = function () {
            console.log('OK on OkDialog CLICKED');
            _this.setState({
                okDialogOpen: false
            });
        };
        _this._authService = props.route.authService;
        if (!_this._authService.isAuthenticated()) {
            _reactRouter.hashHistory.push('/');
        }
        _this.state = {
            markers: [{
                position: {
                    lat: 50.8202949,
                    lng: -0.1406958
                },
                key: 'driver_1',
                icon: '/assets/images/driver.png'
            }, {
                position: {
                    lat: 50.8128187,
                    lng: -0.1361418
                },
                key: 'driver_2',
                icon: '/assets/images/driver.png'
            }],
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            dimensions: { width: -1, height: -1 }
        };
        return _this;
    }
    ViewJob.prototype.render = function () {
        var _this = this;
        var adjustedwidth = this.state.dimensions.width;
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "CURRENT JOB"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactMeasure2.default, { bounds: true, onResize: function onResize(contentRect) {
                _this.setState({ dimensions: contentRect.bounds });
            } }, function (_a) {
            var measureRef = _a.measureRef;
            return React.createElement("div", { ref: measureRef }, React.createElement(ViewJobGoogleMap, { containerElement: React.createElement("div", { style: {
                        position: 'relative',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: { adjustedwidth: adjustedwidth },
                        height: 600,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginTop: 20,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 20
                    } }), mapElement: React.createElement("div", { style: {
                        position: 'relative',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: { adjustedwidth: adjustedwidth },
                        height: 600,
                        marginTop: 20,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 20
                    } }), markers: _this.state.markers, onMarkerClick: _this._handleMarkerClick }));
        }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_RatingDialog.RatingDialog, { theId: "viewJobCompleteBtn", headerText: "Rate your driver/passenger", okCallBack: this._ratingsDialogOkCallBack }), React.createElement(_YesNoDialog.YesNoDialog, { theId: "viewJobCancelBtn", launchButtonText: "Cancel", yesCallBack: this._jobCancelledCallBack, noCallBack: this._jobNotCancelledCallBack, headerText: "Cancel the job" }), React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this._okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return ViewJob;
}(React.Component);
exports.ViewJob = ViewJob;

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ViewRating = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _lodash = __webpack_require__(718);

var _ = _interopRequireWildcard(_lodash);

var _OkDialog = __webpack_require__(74);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactRouter = __webpack_require__(57);

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

var Rating = function () {
    function Rating(fromEmail, toEmail, score) {
        this.fromEmail = fromEmail;
        this.toEmail = toEmail;
        this.score = score;
    }
    return Rating;
}();
var ViewRating = function (_super) {
    __extends(ViewRating, _super);
    function ViewRating(props) {
        var _this = _super.call(this, props) || this;
        _this.loadRatingsFromServer = function () {
            var self = _this;
            var currentUserEmail = _this._authService.userEmail();
            $.ajax({
                type: 'GET',
                url: 'rating/byemail?email=' + currentUserEmail,
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            }).done(function (jdata, textStatus, jqXHR) {
                console.log("result of GET rating/byemail");
                console.log(jqXHR.responseText);
                var ratingsObtained = JSON.parse(jqXHR.responseText);
                self.setState({
                    overallRating: _.sumBy(ratingsObtained, 'score'),
                    ratings: ratingsObtained
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                self.setState({
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: 'Could not load Ratings',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            });
        };
        _this._okDialogCallBack = function () {
            _this.setState({
                okDialogOpen: false
            });
        };
        _this.generateRows = function () {
            return _this.state.ratings.map(function (item) {
                return React.createElement("tr", { key: item.fromEmail }, React.createElement("td", null, item.fromEmail), React.createElement("td", null, item.score));
            });
        };
        _this._authService = props.route.authService;
        if (!_this._authService.isAuthenticated()) {
            _reactRouter.hashHistory.push('/');
        }
        _this.state = {
            overallRating: 0,
            ratings: Array(),
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            wasSuccessful: false
        };
        return _this;
    }
    ViewRating.prototype.componentDidMount = function () {
        this.loadRatingsFromServer();
    };
    ViewRating.prototype.render = function () {
        var rowComponents = this.generateRows();
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 6, md: 6 }, React.createElement("div", null, React.createElement("h4", null, "YOUR OVERALL RATING ", React.createElement(_reactBootstrap.Label, null, this.state.overallRating))))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h6", null, "The finer details of your ratings are shown below"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("div", { className: "table-responsive" }, React.createElement("table", { className: "table table-striped table-bordered table-condensed factTable" }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Rated By"), React.createElement("th", null, "Rating Given"))), React.createElement("tbody", null, rowComponents))))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this._okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return ViewRating;
}(React.Component);
exports.ViewRating = ViewRating;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(122)))

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContainerOperations = undefined;

__webpack_require__(923);

var _inversify = __webpack_require__(121);

var _types = __webpack_require__(147);

var _Foo = __webpack_require__(421);

var _AuthService = __webpack_require__(423);

var _JobService = __webpack_require__(424);

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
        this.container.bind(_types.TYPES.AuthService).to(_AuthService.AuthService);
        this.container.bind(_types.TYPES.JobService).to(_JobService.JobService);
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

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DriverRegistration = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _OkDialog = __webpack_require__(74);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactRouter = __webpack_require__(57);

var _reactBootstrapValidation = __webpack_require__(203);

var _revalidator = __webpack_require__(239);

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
        fullName: {
            type: 'string',
            minLength: 8,
            maxLength: 60,
            required: true,
            allowEmpty: false
        },
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
        },
        vehicleDescription: {
            type: 'string',
            minLength: 6,
            maxLength: 60,
            required: true,
            allowEmpty: false
        },
        vehicleRegistrationNumber: {
            type: 'string',
            minLength: 6,
            maxLength: 30,
            required: true,
            allowEmpty: false
        }
    }
};
var DriverRegistration = function (_super) {
    __extends(DriverRegistration, _super);
    function DriverRegistration(props) {
        var _this = _super.call(this, props) || this;
        _this._validateForm = function (values) {
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
        _this._handleInvalidSubmit = function (errors, values) {
            // Errors is an array containing input names
            // that failed to validate
            _this.setState({
                okDialogHeaderText: 'Validation Error',
                okDialogBodyText: 'Form has errors and may not be submitted',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this._handleValidSubmit = function (values) {
            var driver = values;
            var self = _this;
            $.ajax({
                type: 'POST',
                url: 'registration/save/driver',
                data: JSON.stringify(driver),
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            }).done(function (jdata, textStatus, jqXHR) {
                var redactedDriver = driver;
                redactedDriver.password = "";
                console.log("redacted ${redactedDriver}");
                console.log(redactedDriver);
                console.log("Auth Service");
                console.log(self.props.authService);
                self.props.authService.storeUser(redactedDriver);
                self.setState({
                    okDialogHeaderText: 'Registration Successful',
                    okDialogBodyText: 'You are now registered',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                self.setState({
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: jqXHR.responseText,
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            });
        };
        _this._okDialogCallBack = function () {
            _this.setState({
                okDialogOpen: false
            });
            if (_this.state.wasSuccessful) {
                _reactRouter.hashHistory.push('/');
            }
        };
        _this.state = {
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            wasSuccessful: false
        };
        return _this;
    }
    DriverRegistration.prototype.render = function () {
        return React.createElement(_reactBootstrapValidation.Form, { className: "submittable-form-inner",
            // Supply callbacks to both valid and invalid
            // submit attempts
            validateAll: this._validateForm, onInvalidSubmit: this._handleInvalidSubmit, onValidSubmit: this._handleValidSubmit }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Driver details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'FullName', name: 'fullName', errorHelp: 'FullName is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', name: 'password', label: 'Password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Vehicle details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Vehicle Description', name: 'vehicleDescription', errorHelp: 'Vehicle description is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Vehicle Registration Number', name: 'vehicleRegistrationNumber', errorHelp: 'Vehicle registration number is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "registerBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Register"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this._okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return DriverRegistration;
}(React.Component);
exports.DriverRegistration = DriverRegistration;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(122)))

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PassengerRegistration = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _OkDialog = __webpack_require__(74);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactRouter = __webpack_require__(57);

var _reactBootstrapValidation = __webpack_require__(203);

var _revalidator = __webpack_require__(239);

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
        fullName: {
            type: 'string',
            minLength: 8,
            maxLength: 60,
            required: true,
            allowEmpty: false
        },
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
var PassengerRegistration = function (_super) {
    __extends(PassengerRegistration, _super);
    function PassengerRegistration(props) {
        var _this = _super.call(this, props) || this;
        _this._validateForm = function (values) {
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
        _this._handleInvalidSubmit = function (errors, values) {
            // Errors is an array containing input names
            // that failed to validate
            _this.setState({
                okDialogHeaderText: 'Validation Error',
                okDialogBodyText: 'Form has errors and may not be submitted',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this._handleValidSubmit = function (values) {
            var passenger = values;
            var self = _this;
            $.ajax({
                type: 'POST',
                url: 'registration/save/passenger',
                data: JSON.stringify(passenger),
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            }).done(function (jdata, textStatus, jqXHR) {
                var redactedPassenger = passenger;
                redactedPassenger.password = "";
                console.log("redacted ${redactedPassenger}");
                console.log(redactedPassenger);
                console.log("Auth Service");
                console.log(self.props.authService);
                self.props.authService.storeUser(redactedPassenger);
                self.setState({
                    wasSuccessful: true,
                    okDialogHeaderText: 'Registration Successful',
                    okDialogBodyText: 'You are now registered',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                self.setState({
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: jqXHR.responseText,
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            });
        };
        _this._okDialogCallBack = function () {
            _this.setState({
                okDialogOpen: false
            });
            if (_this.state.wasSuccessful) {
                _reactRouter.hashHistory.push('/');
            }
        };
        _this.state = {
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            wasSuccessful: false
        };
        return _this;
    }
    PassengerRegistration.prototype.render = function () {
        return React.createElement(_reactBootstrapValidation.Form, { className: "submittable-form-inner",
            // Supply callbacks to both valid and invalid
            // submit attempts
            validateAll: this._validateForm, onInvalidSubmit: this._handleInvalidSubmit, onValidSubmit: this._handleValidSubmit }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Passenger details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'FullName', name: 'fullName', errorHelp: 'FullName is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', label: 'Password', name: 'password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "registerBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Register"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this._okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return PassengerRegistration;
}(React.Component);
exports.PassengerRegistration = PassengerRegistration;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(122)))

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RatingDialog = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactStars = __webpack_require__(909);

var _reactStars2 = _interopRequireDefault(_reactStars);

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

var RatingDialog = function (_super) {
    __extends(RatingDialog, _super);
    function RatingDialog(props) {
        var _this = _super.call(this, props) || this;
        _this._close = function () {
            _this.setState({
                showModal: false,
                rating: 0,
                ratingText: ''
            });
        };
        _this._open = function () {
            _this.setState({
                showModal: true,
                rating: 0,
                ratingText: 'Current rating 0'
            });
        };
        _this._ratingChanged = function (newRating) {
            console.log(newRating);
            _this.setState({
                rating: newRating,
                ratingText: 'Current rating ' + newRating
            });
        };
        _this._okClicked = function () {
            _this._close();
            _this.props.okCallBack();
        };
        console.log(_this.props);
        //set initial state
        _this.state = {
            showModal: false,
            rating: 0,
            ratingText: ''
        };
        return _this;
    }
    RatingDialog.prototype.render = function () {
        return React.createElement("div", { className: "leftFloat" }, React.createElement(_reactBootstrap.Button, { id: this.props.theId, type: 'button', bsSize: 'small', bsStyle: 'primary', onClick: this._open }, "Complete"), React.createElement(_reactBootstrap.Modal, { show: this.state.showModal, onHide: this._close }, React.createElement(_reactBootstrap.Modal.Header, { closeButton: true }, React.createElement(_reactBootstrap.Modal.Title, null, this.props.headerText)), React.createElement(_reactBootstrap.Modal.Body, null, React.createElement("h4", null, "Give your rating between 1-5"), React.createElement("h5", null, this.state.ratingText), React.createElement(_reactStars2.default, { count: 5, onChange: this._ratingChanged, size: 24, color2: '#ffd700' })), React.createElement(_reactBootstrap.Modal.Footer, null, React.createElement(_reactBootstrap.Button, { type: 'submit', bsSize: 'small', bsStyle: 'primary', onClick: this._okClicked }, "Ok"))));
    };
    return RatingDialog;
}(React.Component);
exports.RatingDialog = RatingDialog;

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Foo = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inversify = __webpack_require__(121);

var _types = __webpack_require__(147);

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

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(19);

var ReactDOM = _interopRequireWildcard(_reactDom);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactRouter = __webpack_require__(57);

var _Login = __webpack_require__(412);

var _Logout = __webpack_require__(413);

var _Register = __webpack_require__(414);

var _CreateJob = __webpack_require__(411);

var _ViewJob = __webpack_require__(415);

var _ViewRating = __webpack_require__(416);

var _ContainerOperations = __webpack_require__(417);

var _types = __webpack_require__(147);

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

var authService = _ContainerOperations.ContainerOperations.getInstance().container.get(_types.TYPES.AuthService);
var jobService = _ContainerOperations.ContainerOperations.getInstance().container.get(_types.TYPES.JobService);
var MainNav = function (_super) {
    __extends(MainNav, _super);
    function MainNav(props) {
        var _this = _super.call(this, props) || this;
        console.log(props);
        _this.state = {
            isLoggedIn: false
        };
        return _this;
    }
    MainNav.prototype.componentWillMount = function () {
        var _this = this;
        this._subscription = this.props.authService.getAuthenticationStream().subscribe(function (isAuthenticated) {
            _this.state = {
                isLoggedIn: isAuthenticated
            };
            if (_this.state.isLoggedIn) {
                _reactRouter.hashHistory.push('/createjob');
            } else {
                _reactRouter.hashHistory.push('/');
            }
        });
    };
    MainNav.prototype.componentWillUnmount = function () {
        this._subscription.dispose();
    };
    MainNav.prototype.render = function () {
        return this.state.isLoggedIn ? React.createElement(_reactBootstrap.Navbar, { collapseOnSelect: true }, React.createElement(_reactBootstrap.Navbar.Header, null, React.createElement(_reactBootstrap.Navbar.Brand, null, React.createElement("span", null, "Simple Kafka-Uber")), React.createElement(_reactBootstrap.Navbar.Toggle, null)), React.createElement(_reactBootstrap.Navbar.Collapse, null, React.createElement(_reactBootstrap.Nav, { pullRight: true }, React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/logout' }, "Logout"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/createjob' }, "Create Job"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/viewjob' }, "View Job"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/viewrating' }, "View Rating")))) : React.createElement(_reactBootstrap.Navbar, { pullRight: true, collapseOnSelect: true }, React.createElement(_reactBootstrap.Navbar.Header, null, React.createElement(_reactBootstrap.Navbar.Brand, null, React.createElement("span", null, "Simple Kafka-Uber")), React.createElement(_reactBootstrap.Navbar.Toggle, null)), React.createElement(_reactBootstrap.Navbar.Collapse, null));
    };
    return MainNav;
}(React.Component);
var App = function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return React.createElement("div", null, React.createElement("div", null, React.createElement(MainNav, { authService: authService, jobService: jobService }), this.props.children));
    };
    return App;
}(React.Component);
ReactDOM.render(React.createElement(_reactRouter.Router, { history: _reactRouter.hashHistory }, React.createElement(_reactRouter.Route, { component: App }, React.createElement(_reactRouter.Route, { path: "/", component: _Login.Login, authService: authService }), React.createElement(_reactRouter.Route, { path: "/register", component: _Register.Register, authService: authService }), React.createElement(_reactRouter.Route, { path: "/logout", component: _Logout.Logout, authService: authService }), React.createElement(_reactRouter.Route, { path: "/createjob", component: _CreateJob.CreateJob, authService: authService, jobService: jobService }), React.createElement(_reactRouter.Route, { path: "/viewjob", component: _ViewJob.ViewJob, authService: authService }), React.createElement(_reactRouter.Route, { path: "/viewrating", component: _ViewRating.ViewRating, authService: authService }))), document.getElementById('root'));

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inversify = __webpack_require__(121);

var _rx = __webpack_require__(925);

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var AuthService = function () {
    function AuthService() {
        var _this = this;
        this._authenticatedSubject = new _rx2.default.Subject();
        this.clearUser = function () {
            _this._isAuthenticated = false;
            sessionStorage.removeItem('currentUserProfile');
            _this._authenticatedSubject.onNext(false);
        };
        this.storeUser = function (currentUser) {
            if (currentUser == null || currentUser == undefined) return;
            _this._isAuthenticated = true;
            sessionStorage.setItem('currentUserProfile', JSON.stringify(currentUser));
            _this._authenticatedSubject.onNext(true);
        };
        this.userName = function () {
            var user = JSON.parse(sessionStorage.getItem('currentUserProfile'));
            return user.fullName;
        };
        this.userEmail = function () {
            var user = JSON.parse(sessionStorage.getItem('currentUserProfile'));
            return user.email;
        };
        this.isAuthenticated = function () {
            return _this._isAuthenticated;
        };
        this.getAuthenticationStream = function () {
            return _this._authenticatedSubject.asObservable();
        };
    }
    return AuthService;
}();
exports.AuthService = AuthService = __decorate([(0, _inversify.injectable)(), __metadata("design:paramtypes", [])], AuthService);
exports.AuthService = AuthService;

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JobService = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inversify = __webpack_require__(121);

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

var JobService = function () {
    function JobService() {
        var _this = this;
        this.clearUserIssuedJob = function () {
            _this._hasIssuedJob = false;
            sessionStorage.removeItem('currentUserIssuedJob');
        };
        this.storeUserIssuedJob = function (currentUser, job) {
            if (currentUser == null || currentUser == undefined) return;
            if (job == null || job == undefined) return;
            _this._hasIssuedJob = true;
            var currentUsersJob = {
                currentUser: currentUser,
                currentJob: job
            };
            sessionStorage.setItem('currentUserIssuedJob', JSON.stringify(currentUsersJob));
        };
        this.currentJob = function () {
            var currentUsersJob = JSON.parse(sessionStorage.getItem('currentUserIssuedJob'));
            return currentUsersJob;
        };
        this.hasIssuedJob = function () {
            return _this._hasIssuedJob;
        };
        this._hasIssuedJob = false;
    }
    return JobService;
}();
exports.JobService = JobService = __decorate([(0, _inversify.injectable)(), __metadata("design:paramtypes", [])], JobService);
exports.JobService = JobService;

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OkDialog = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

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

var OkDialog = function (_super) {
    __extends(OkDialog, _super);
    function OkDialog(props) {
        var _this = _super.call(this, props) || this;
        _this._okClicked = function () {
            _this.setState({ showModal: false });
            _this.props.okCallBack();
        };
        _this._close = function () {
            _this.setState({ showModal: false });
            _this.props.okCallBack();
        };
        _this._open = function () {
            _this.setState({ showModal: true });
        };
        //set initial state
        _this.state = {
            showModal: false
        };
        return _this;
    }
    OkDialog.prototype.componentDidMount = function () {
        if (this.props.open === true) {
            this.setState({ showModal: true });
        }
    };
    OkDialog.prototype.render = function () {
        return React.createElement("div", { className: "leftFloat" }, React.createElement(_reactBootstrap.Modal, { show: this.state.showModal, onHide: this._close }, React.createElement(_reactBootstrap.Modal.Header, { closeButton: true }, React.createElement(_reactBootstrap.Modal.Title, null, this.props.headerText)), React.createElement(_reactBootstrap.Modal.Body, null, React.createElement("h4", null, this.props.bodyText)), React.createElement(_reactBootstrap.Modal.Footer, null, React.createElement(_reactBootstrap.Button, { type: 'button', bsSize: 'small', bsStyle: 'primary', onClick: this._okClicked }, "Ok"))));
    };
    return OkDialog;
}(React.Component);
exports.OkDialog = OkDialog;

/***/ })

},[422]);
//# sourceMappingURL=index.bundle.b379c8754e12c16dcbaa.js.map