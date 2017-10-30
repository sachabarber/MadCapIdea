webpackJsonp([1],{

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var TYPES = exports.TYPES = {
    AuthService: Symbol("AuthService"),
    JobService: Symbol("JobService"),
    JobStreamService: Symbol("JobStreamService"),
    PositionService: Symbol("PositionService")
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
        _this.yesClicked = function () {
            _this.setState({ showModal: false });
            _this.props.yesCallBack();
        };
        _this.noClicked = function () {
            _this.setState({ showModal: false });
            _this.props.noCallBack();
        };
        _this.close = function () {
            _this.setState({ showModal: false });
        };
        _this.open = function () {
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
        return React.createElement("div", { className: "leftFloat" }, React.createElement(_reactBootstrap.Button, { id: this.props.theId, type: 'button', bsSize: 'small', bsStyle: 'primary', onClick: this.open }, this.props.launchButtonText), React.createElement(_reactBootstrap.Modal, { show: this.state.showModal, onHide: this.close }, React.createElement(_reactBootstrap.Modal.Header, { closeButton: true }, React.createElement(_reactBootstrap.Modal.Title, null, this.props.headerText)), React.createElement(_reactBootstrap.Modal.Body, null, React.createElement("h4", null, "Are you sure?")), React.createElement(_reactBootstrap.Modal.Footer, null, React.createElement(_reactBootstrap.Button, { type: 'button', bsSize: 'small', bsStyle: 'primary', onClick: this.yesClicked }, "Yes"), React.createElement(_reactBootstrap.Button, { type: 'button', bsSize: 'small', bsStyle: 'danger', onClick: this.noClicked }, "Cancel"))));
    };
    return YesNoDialog;
}(React.Component);
exports.YesNoDialog = YesNoDialog;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Position = function () {
    function Position(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    return Position;
}();
exports.Position = Position;

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CreateJob = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactMeasure = __webpack_require__(390);

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _OkDialog = __webpack_require__(58);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _UUIDService = __webpack_require__(431);

var _Position = __webpack_require__(241);

var _reactRouter = __webpack_require__(57);

var _reactGoogleMaps = __webpack_require__(389);

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
            return props.onCreateJobClick();
        }, disabled: props.hasIssuedJob, value: 'Create Job' }, "Create Job"))));
});
var CreateJob = function (_super) {
    __extends(CreateJob, _super);
    function CreateJob(props) {
        var _this = _super.call(this, props) || this;
        _this.handleCreateJobClick = function () {
            var self = _this;
            var currentUser = _this._authService.user();
            var newJob = {
                jobUUID: _UUIDService.UUIDService.createUUID(),
                clientFullName: currentUser.fullName,
                clientEmail: currentUser.email,
                clientPosition: {
                    latitude: self.state.currentPosition.lat,
                    longitude: self.state.currentPosition.lng
                },
                driverFullName: '',
                driverEmail: '',
                vehicleDescription: '',
                vehicleRegistrationNumber: '',
                isAssigned: false,
                isCompleted: false
            };
            $.ajax({
                type: 'POST',
                url: 'job/submit',
                data: JSON.stringify(newJob),
                contentType: "application/json; charset=utf-8",
                dataType: 'json'
            }).done(function (jdata, textStatus, jqXHR) {
                self._jobService.storeUserIssuedJob(newJob);
                var newState = Object.assign({}, self.state, {
                    hasIssuedJob: self._jobService.hasIssuedJob()
                });
                self.setState(newState);
                self._positionService.storeUserPosition(currentUser, self.state.currentPosition);
                _reactRouter.hashHistory.push('/viewjob');
            }).fail(function (jqXHR, textStatus, errorThrown) {
                var newState = Object.assign({}, self.state, {
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: jqXHR.responseText,
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
                self.setState(newState);
            });
        };
        _this.okDialogCallBack = function () {
            _this.setState({
                okDialogOpen: false
            });
        };
        _this.handleMapLoad = function (map) {
            if (map) {
                console.log(map.getZoom());
            }
        };
        _this.handleMapClick = function (event) {
            var newState = Object.assign({}, _this.state, {
                currentPosition: new _Position.Position(event.latLng.lat(), event.latLng.lng())
            });
            _this.setState(newState);
        };
        _this._jobService = props.route.jobService;
        _this._authService = props.route.authService;
        _this._positionService = props.route.positionService;
        console.log(_this._authService.userName());
        console.log(_this._authService.userEmail());
        console.log("CreateJob ctor");
        console.log(_this._jobService);
        if (!_this._authService.isAuthenticated()) {
            _reactRouter.hashHistory.push('/');
        }
        if (_this._authService.isDriver()) {
            _reactRouter.hashHistory.push('/viewjob');
        }
        _this.state = {
            currentPosition: new _Position.Position(50.8202949, -0.1406958),
            dimensions: { width: -1, height: -1 },
            hasIssuedJob: _this._jobService.hasIssuedJob(),
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            wasSuccessful: false
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
                    } }), onMapLoad: _this.handleMapLoad, onMapClick: _this.handleMapClick, currentPosition: _this.state.currentPosition, onCreateJobClick: _this.handleCreateJobClick, hasIssuedJob: _this.state.hasIssuedJob }));
        }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this.okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return CreateJob;
}(React.Component);
exports.CreateJob = CreateJob;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Login = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _OkDialog = __webpack_require__(58);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactBootstrapValidation = __webpack_require__(202);

var _revalidator = __webpack_require__(238);

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
        _this.validateForm = function (values) {
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
        _this.handleInvalidSubmit = function (errors, values) {
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
        _this.handleValidSubmit = function (values) {
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
                var currentUser = JSON.parse(jqXHR.responseText);
                var userProfile = {
                    isDriver: logindetails.isDriver,
                    user: currentUser
                };
                self._authService.storeUser(userProfile);
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
        _this.okDialogCallBack = function () {
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
            validateAll: this.validateForm, onInvalidSubmit: this.handleInvalidSubmit, onValidSubmit: this.handleValidSubmit }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "ENTER YOUR LOGIN DETAILS"), React.createElement("span", null, React.createElement("h6", null, "Or click ", React.createElement("a", { href: "#/register" }, "here"), " to register")))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', name: 'password', label: 'Password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'checkbox', name: 'isDriver', label: 'Are you a driver?' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "loginBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Login"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this.okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey }))))));
    };
    return Login;
}(React.Component);
exports.Login = Login;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Logout = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactRouter = __webpack_require__(57);

var _OkDialog = __webpack_require__(58);

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
        _this.okDialogCallBack = function () {
            _this.setState({
                okDialogOpen: false
            });
        };
        _this.logoutYesCallBack = function () {
            var email = _this._authService.userEmail();
            _this._jobService.clearUserIssuedJob();
            _this._authService.clearUser();
            _this._positionService.clearUserPosition(email);
            _this._positionService.clearUserJobPositions(email);
            _this.setState({
                okDialogHeaderText: 'Logout',
                okDialogBodyText: 'You have been logged out',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
            _reactRouter.hashHistory.push('/');
        };
        _this.logoutNoCallBack = function () {};
        console.log(props);
        _this._authService = props.route.authService;
        _this._jobService = props.route.jobService;
        _this._positionService = props.route.positionService;
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
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, React.createElement("span", null, "YOU ARE CURRENTLY LOGGED IN AS [", this._authService.userName(), "]")), React.createElement("span", null, React.createElement("h6", null, "Click the button to logout")))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_YesNoDialog.YesNoDialog, { theId: "logoutBtn", launchButtonText: "Logout", yesCallBack: this.logoutYesCallBack, noCallBack: this.logoutNoCallBack, headerText: "Confirm logout" }), React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this.okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return Logout;
}(React.Component);
exports.Logout = Logout;

/***/ }),

/***/ 417:
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

var _PassengerRegistration = __webpack_require__(422);

var _DriverRegistration = __webpack_require__(421);

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
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "PLEASE ENTER YOUR REGISTRATION DETAILS"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h6", null, "Choose your registration type "))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonGroup, null, React.createElement(_reactBootstrap.Button, { bsSize: 'small', onClick: this.onOptionChange.bind(this, 'passenger'), active: this.state.option === 'passenger' }, "Passenger"), React.createElement(_reactBootstrap.Button, { bsSize: 'small', onClick: this.onOptionChange.bind(this, 'driver'), active: this.state.option === 'driver' }, "Driver")))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, this.state.option === 'passenger' ? React.createElement("div", null, React.createElement(_PassengerRegistration.PassengerRegistration, { authService: this._authService })) : React.createElement("div", null, React.createElement(_DriverRegistration.DriverRegistration, { authService: this._authService }))))));
    };
    Register.prototype.onOptionChange = function (option) {
        this.setState({
            option: option
        });
    };
    return Register;
}(React.Component);
exports.Register = Register;

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ViewJob = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _lodash = __webpack_require__(336);

var _ = _interopRequireWildcard(_lodash);

var _reactMeasure = __webpack_require__(390);

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _RatingDialog = __webpack_require__(423);

var _YesNoDialog = __webpack_require__(240);

var _OkDialog = __webpack_require__(58);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _Position = __webpack_require__(241);

var _PositionMarker = __webpack_require__(425);

var _reactRouter = __webpack_require__(57);

var _reactGoogleMaps = __webpack_require__(389);

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
var GetAcceptButtonCss = function GetAcceptButtonCss(isDriver) {
    return isDriver ? "displayNone" : "displayBlock";
};
var ViewJobGoogleMap = (0, _reactGoogleMaps.withGoogleMap)(function (props) {
    return React.createElement(_reactGoogleMaps.GoogleMap, { ref: props.onMapLoad, defaultZoom: 14, defaultCenter: { lat: 50.8202949, lng: -0.1406958 }, onClick: props.onMapClick }, props.markers.map(function (marker, index) {
        return React.createElement(_reactGoogleMaps.OverlayView, { key: marker.key, mapPaneName: _reactGoogleMaps.OverlayView.OVERLAY_MOUSE_TARGET, position: marker.position, getPixelPositionOffset: GetPixelPositionOffset }, React.createElement("div", { style: STYLES.overlayView }, React.createElement("img", { src: marker.icon }), React.createElement("strong", null, marker.key), React.createElement("br", null), React.createElement(_reactBootstrap.Button, { className: GetAcceptButtonCss(marker.isDriver), type: 'button', bsSize: 'xsmall', bsStyle: 'primary', onClick: function onClick() {
                return props.onMarkerClick(marker);
            }, value: 'Accept' }, "Accept")));
    }));
});
var ViewJob = function (_super) {
    __extends(ViewJob, _super);
    function ViewJob(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMarkerClick = function (targetMarker) {
            console.log('button on overlay clicked:' + targetMarker.key);
        };
        _this.handleMapClick = function (event) {
            var currentUser = _this._authService.user();
            var isDriver = _this._authService.isDriver();
            var matchedMarker = _.find(_this.state.markers, { 'email': currentUser.email });
            if (matchedMarker != undefined) {
                var newMarkersList = _this.state.markers;
                _.remove(newMarkersList, function (n) {
                    return n.email === matchedMarker.email;
                });
                matchedMarker.position = new _Position.Position(event.latLng.lat(), event.latLng.lng());
                newMarkersList.push(matchedMarker);
                var newState = Object.assign({}, _this.state, {
                    currentPosition: new _Position.Position(event.latLng.lat(), event.latLng.lng()),
                    markers: newMarkersList
                });
                _this.setState(newState);
            } else {
                if (isDriver) {
                    var newDriverMarker = _this.createMarker(currentUser.fullName, currentUser.email, isDriver, event);
                    var newMarkersList = _this.state.markers;
                    newMarkersList.push(newDriverMarker);
                    var newState = Object.assign({}, _this.state, {
                        currentPosition: new _Position.Position(event.latLng.lat(), event.latLng.lng()),
                        markers: newMarkersList
                    });
                    _this.setState(newState);
                }
            }
            _this._positionService.clearUserJobPositions(currentUser.email);
            _this._positionService.storeUserJobPositions(currentUser.email, _this.state.markers);
            //TODO : We should push out Job here based on whether current user was driver/client
            //TODO : We should push out Job here based on whether current user was driver/client
            //TODO : We should push out Job here based on whether current user was driver/client
            //TODO : We should push out Job here based on whether current user was driver/client
            //TODO : We should push out Job here based on whether current user was driver/client
        };
        _this.createMarker = function (fullname, email, isDriver, event) {
            return new _PositionMarker.PositionMarker(fullname, new _Position.Position(event.latLng.lat(), event.latLng.lng()), fullname, email, _this.createIcon(isDriver), isDriver);
        };
        _this.createIcon = function (isDriver) {
            return isDriver ? '/assets/images/driver.png' : '/assets/images/passenger.png';
        };
        _this.addMarkerForJob = function (jobArgs) {
            //TODO : should see if the client/driver for the job is in the list if it is remove it
            //TODO : add it
            //TODO : Update the list of position markers in the PositionService
        };
        _this.shouldShowMarkerForJob = function (jobArgs) {
            //TODO
            //1. If the current job client is the current client logged in
            //2. If the current job driver is the current driver logged in
            //3. If the job isAssigned and its for the current logged in client/driver
            //4. Or if the job is unassigned and if there is no other active job for this client/driver
            return true;
        };
        _this.ratingsDialogOkCallBack = function () {
            console.log('RATINGS OK CLICKED');
            _this.setState({
                okDialogHeaderText: 'Ratings',
                okDialogBodyText: 'Rating successfully recorded',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this.jobCancelledCallBack = function () {
            console.log('YES CLICKED');
            _this.setState({
                okDialogHeaderText: 'Job Cancellaton',
                okDialogBodyText: 'Job successfully cancelled',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this.jobNotCancelledCallBack = function () {
            console.log('NO CLICKED');
            _this.setState({
                okDialogHeaderText: 'Job Cancellaton',
                okDialogBodyText: 'Job remains open',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this.okDialogCallBack = function () {
            console.log('OK on OkDialog CLICKED');
            _this.setState({
                okDialogOpen: false
            });
        };
        _this._authService = props.route.authService;
        _this._jobStreamService = props.route.jobStreamService;
        _this._positionService = props.route.positionService;
        if (!_this._authService.isAuthenticated()) {
            _reactRouter.hashHistory.push('/');
        }
        //TODO : remove this
        //this._positionService.storeUserJobPositions(
        //    this._authService.userEmail(),
        //    [
        //        new PositionMarker(
        //            'driver_1',
        //            new Position(50.8202949, -0.1406958),
        //            "driver_1",
        //            "drive1@here.com",
        //            '/assets/images/driver.png',
        //            true
        //        ),
        //        new PositionMarker(
        //            'driver_2',
        //            new Position(50.8128187, -0.1361418),
        //            "driver_2",
        //            "drive2@here.com",
        //            '/assets/images/driver.png',
        //            true
        //        )
        //    ]);
        var savedMarkers = new Array();
        if (_this._positionService.hasJobPositions(_this._authService.userEmail())) {
            savedMarkers = _this._positionService.userJobPositions(_this._authService.userEmail());
        }
        _this.state = {
            markers: savedMarkers,
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            dimensions: { width: -1, height: -1 },
            currentPosition: _this._authService.isDriver() ? null : _this._positionService.currentPosition(_this._authService.userEmail())
        };
        return _this;
    }
    ViewJob.prototype.componentWillMount = function () {
        this._subscription = this._jobStreamService.getJobStream().subscribe(function (jobArgs) {
            //TODO : 1. This should not be hard coded
            //TODO : 2. We should push out current job when we FIRST LOAD this page
            //          if we are a client, and we should enrich it if we are a driver
            //       3. The list of markers should be worked out again every time based
            //          on RX stream messages
            console.log('RX saw onJobChanged');
            console.log('RX x = ', jobArgs.detail);
        }, function (error) {
            console.log('RX saw ERROR');
            console.log('RX error = ', error);
        }, function () {
            console.log('RX saw COMPLETE');
        });
    };
    ViewJob.prototype.componentWillUnmount = function () {
        this._subscription.dispose();
        this._positionService.storeUserJobPositions(this._authService.user, this.state.markers);
    };
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
                    } }), markers: _this.state.markers, onMapClick: _this.handleMapClick, onMarkerClick: _this.handleMarkerClick }));
        }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_RatingDialog.RatingDialog, { theId: "viewJobCompleteBtn", headerText: "Rate your driver/passenger", okCallBack: this.ratingsDialogOkCallBack }), React.createElement(_YesNoDialog.YesNoDialog, { theId: "viewJobCancelBtn", launchButtonText: "Cancel", yesCallBack: this.jobCancelledCallBack, noCallBack: this.jobNotCancelledCallBack, headerText: "Cancel the job" }), React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this.okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return ViewJob;
}(React.Component);
exports.ViewJob = ViewJob;

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ViewRating = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _lodash = __webpack_require__(336);

var _ = _interopRequireWildcard(_lodash);

var _OkDialog = __webpack_require__(58);

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
        _this.okDialogCallBack = function () {
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
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 6, md: 6 }, React.createElement("div", null, React.createElement("h4", null, "YOUR OVERALL RATING ", React.createElement(_reactBootstrap.Label, null, this.state.overallRating))))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h6", null, "The finer details of your ratings are shown below"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("div", { className: "table-responsive" }, React.createElement("table", { className: "table table-striped table-bordered table-condensed factTable" }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Rated By"), React.createElement("th", null, "Rating Given"))), React.createElement("tbody", null, rowComponents))))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this.okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return ViewRating;
}(React.Component);
exports.ViewRating = ViewRating;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContainerOperations = undefined;

__webpack_require__(929);

var _inversify = __webpack_require__(96);

var _types = __webpack_require__(239);

var _AuthService = __webpack_require__(427);

var _JobService = __webpack_require__(428);

var _JobStreamService = __webpack_require__(429);

var _PositionService = __webpack_require__(430);

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
        this.container.bind(_types.TYPES.AuthService).to(_AuthService.AuthService);
        this.container.bind(_types.TYPES.JobService).to(_JobService.JobService);
        this.container.bind(_types.TYPES.JobStreamService).to(_JobStreamService.JobStreamService);
        this.container.bind(_types.TYPES.PositionService).to(_PositionService.PositionService);
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

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DriverRegistration = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _OkDialog = __webpack_require__(58);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactRouter = __webpack_require__(57);

var _reactBootstrapValidation = __webpack_require__(202);

var _revalidator = __webpack_require__(238);

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
        _this.validateForm = function (values) {
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
        _this.handleInvalidSubmit = function (errors, values) {
            // Errors is an array containing input names
            // that failed to validate
            _this.setState({
                okDialogHeaderText: 'Validation Error',
                okDialogBodyText: 'Form has errors and may not be submitted',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this.handleValidSubmit = function (values) {
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
                var userProfile = {
                    isDriver: true,
                    user: redactedDriver
                };
                self.setState({
                    okDialogHeaderText: 'Registration Successful',
                    okDialogBodyText: 'You are now registered',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
                self.props.authService.storeUser(userProfile);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                self.setState({
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: jqXHR.responseText,
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            });
        };
        _this.okDialogCallBack = function () {
            _this.setState({
                okDialogOpen: false
            });
            if (_this.state.wasSuccessful) {
                _reactRouter.hashHistory.push('/viewjob');
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
            validateAll: this.validateForm, onInvalidSubmit: this.handleInvalidSubmit, onValidSubmit: this.handleValidSubmit }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Driver details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'FullName', name: 'fullName', errorHelp: 'FullName is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', name: 'password', label: 'Password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Vehicle details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Vehicle Description', name: 'vehicleDescription', errorHelp: 'Vehicle description is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Vehicle Registration Number', name: 'vehicleRegistrationNumber', errorHelp: 'Vehicle registration number is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "registerBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Register"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this.okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return DriverRegistration;
}(React.Component);
exports.DriverRegistration = DriverRegistration;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PassengerRegistration = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _OkDialog = __webpack_require__(58);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactRouter = __webpack_require__(57);

var _reactBootstrapValidation = __webpack_require__(202);

var _revalidator = __webpack_require__(238);

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
        _this.validateForm = function (values) {
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
        _this.handleInvalidSubmit = function (errors, values) {
            // Errors is an array containing input names
            // that failed to validate
            _this.setState({
                okDialogHeaderText: 'Validation Error',
                okDialogBodyText: 'Form has errors and may not be submitted',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
        };
        _this.handleValidSubmit = function (values) {
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
                var userProfile = {
                    isDriver: false,
                    user: redactedPassenger
                };
                self.setState({
                    wasSuccessful: true,
                    okDialogHeaderText: 'Registration Successful',
                    okDialogBodyText: 'You are now registered',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
                self.props.authService.storeUser(userProfile);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                self.setState({
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: jqXHR.responseText,
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            });
        };
        _this.okDialogCallBack = function () {
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
            validateAll: this.validateForm, onInvalidSubmit: this.handleInvalidSubmit, onValidSubmit: this.handleValidSubmit }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Passenger details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'FullName', name: 'fullName', errorHelp: 'FullName is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', label: 'Password', name: 'password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "registerBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Register"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this.okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return PassengerRegistration;
}(React.Component);
exports.PassengerRegistration = PassengerRegistration;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),

/***/ 423:
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

var _reactStars = __webpack_require__(915);

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
        _this.close = function () {
            _this.setState({
                showModal: false,
                rating: 0,
                ratingText: ''
            });
        };
        _this.open = function () {
            _this.setState({
                showModal: true,
                rating: 0,
                ratingText: 'Current rating 0'
            });
        };
        _this.ratingChanged = function (newRating) {
            console.log(newRating);
            _this.setState({
                rating: newRating,
                ratingText: 'Current rating ' + newRating
            });
        };
        _this.okClicked = function () {
            _this.close();
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
        return React.createElement("div", { className: "leftFloat" }, React.createElement(_reactBootstrap.Button, { id: this.props.theId, type: 'button', bsSize: 'small', bsStyle: 'primary', onClick: this.open }, "Complete"), React.createElement(_reactBootstrap.Modal, { show: this.state.showModal, onHide: this.close }, React.createElement(_reactBootstrap.Modal.Header, { closeButton: true }, React.createElement(_reactBootstrap.Modal.Title, null, this.props.headerText)), React.createElement(_reactBootstrap.Modal.Body, null, React.createElement("h4", null, "Give your rating between 1-5"), React.createElement("h5", null, this.state.ratingText), React.createElement(_reactStars2.default, { count: 5, onChange: this.ratingChanged, size: 24, color2: '#ffd700' })), React.createElement(_reactBootstrap.Modal.Footer, null, React.createElement(_reactBootstrap.Button, { type: 'submit', bsSize: 'small', bsStyle: 'primary', onClick: this.okClicked }, "Ok"))));
    };
    return RatingDialog;
}(React.Component);
exports.RatingDialog = RatingDialog;

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var JobEventArgs = function () {
    function JobEventArgs(detail) {
        this.detail = detail;
    }
    return JobEventArgs;
}();
exports.JobEventArgs = JobEventArgs;

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var PositionMarker = function () {
    function PositionMarker(key, position, name, email, icon, isDriver) {
        this.key = key;
        this.position = position;
        this.name = name;
        this.email = email;
        this.icon = icon;
        this.isDriver = isDriver;
    }
    return PositionMarker;
}();
exports.PositionMarker = PositionMarker;

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(19);

var ReactDOM = _interopRequireWildcard(_reactDom);

__webpack_require__(31);

var _reactBootstrap = __webpack_require__(24);

var _reactRouter = __webpack_require__(57);

var _Login = __webpack_require__(415);

var _Logout = __webpack_require__(416);

var _Register = __webpack_require__(417);

var _CreateJob = __webpack_require__(414);

var _ViewJob = __webpack_require__(418);

var _ViewRating = __webpack_require__(419);

var _ContainerOperations = __webpack_require__(420);

var _types = __webpack_require__(239);

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
var jobStreamService = _ContainerOperations.ContainerOperations.getInstance().container.get(_types.TYPES.JobStreamService);
var positionService = _ContainerOperations.ContainerOperations.getInstance().container.get(_types.TYPES.PositionService);
jobStreamService.init();
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
        return React.createElement("div", null, React.createElement("div", null, React.createElement(MainNav, { authService: authService, jobService: jobService, jobStreamService: jobStreamService, positionService: positionService }), this.props.children));
    };
    return App;
}(React.Component);
ReactDOM.render(React.createElement(_reactRouter.Router, { history: _reactRouter.hashHistory }, React.createElement(_reactRouter.Route, { component: App }, React.createElement(_reactRouter.Route, { path: "/", component: _Login.Login, authService: authService }), React.createElement(_reactRouter.Route, { path: "/register", component: _Register.Register, authService: authService }), React.createElement(_reactRouter.Route, { path: "/logout", component: _Logout.Logout, authService: authService, jobService: jobService, positionService: positionService }), React.createElement(_reactRouter.Route, { path: "/createjob", component: _CreateJob.CreateJob, authService: authService, jobService: jobService, positionService: positionService }), React.createElement(_reactRouter.Route, { path: "/viewjob", component: _ViewJob.ViewJob, authService: authService, jobStreamService: jobStreamService, positionService: positionService }), React.createElement(_reactRouter.Route, { path: "/viewrating", component: _ViewRating.ViewRating, authService: authService }))), document.getElementById('root'));

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inversify = __webpack_require__(96);

var _rx = __webpack_require__(412);

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
        this.storeUser = function (currentProfile) {
            if (currentProfile == null || currentProfile == undefined) return;
            _this._isAuthenticated = true;
            sessionStorage.setItem('currentUserProfile', JSON.stringify(currentProfile));
            _this._authenticatedSubject.onNext(true);
        };
        this.userName = function () {
            var userProfile = JSON.parse(sessionStorage.getItem('currentUserProfile'));
            return userProfile.user.fullName;
        };
        this.user = function () {
            var userProfile = JSON.parse(sessionStorage.getItem('currentUserProfile'));
            return userProfile.user;
        };
        this.userEmail = function () {
            var userProfile = JSON.parse(sessionStorage.getItem('currentUserProfile'));
            return userProfile.user.email;
        };
        this.isDriver = function () {
            var userProfile = JSON.parse(sessionStorage.getItem('currentUserProfile'));
            return userProfile.isDriver;
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

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JobService = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inversify = __webpack_require__(96);

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
        this.storeUserIssuedJob = function (job) {
            if (job == null || job == undefined) return;
            _this._hasIssuedJob = true;
            sessionStorage.setItem('currentUserIssuedJob', JSON.stringify(job));
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

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JobStreamService = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inversify = __webpack_require__(96);

var _JobEventArgs = __webpack_require__(424);

var _rx = __webpack_require__(412);

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

var JobStreamService = function () {
    function JobStreamService() {
        var _this = this;
        this.init = function () {
            window['jobChanged'] = function (incomingJsonPayload) {
                var evt = new CustomEvent('onJobChanged', new _JobEventArgs.JobEventArgs(incomingJsonPayload));
                window.dispatchEvent(evt);
            };
            _this._jobSourceObservable = _rx2.default.Observable.fromEvent(window, 'onJobChanged');
        };
        this.getJobStream = function () {
            return _this._jobSourceObservable;
        };
    }
    return JobStreamService;
}();
exports.JobStreamService = JobStreamService = __decorate([(0, _inversify.injectable)(), __metadata("design:paramtypes", [])], JobStreamService);
exports.JobStreamService = JobStreamService;

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PositionService = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inversify = __webpack_require__(96);

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

var PositionService = function () {
    //markers: Array<PositionMarker>;
    function PositionService() {
        this.clearUserJobPositions = function (email) {
            var keyCurrentUserJobPositions = 'currentUserJobPositions_' + email;
            sessionStorage.removeItem(keyCurrentUserJobPositions);
        };
        this.storeUserJobPositions = function (currentUser, jobPositions) {
            if (currentUser == null || currentUser == undefined) return;
            if (jobPositions == null || jobPositions == undefined) return;
            var currentUsersJobPositions = {
                currentUser: currentUser,
                jobPositions: jobPositions
            };
            var keyCurrentUserJobPositions = 'currentUserJobPositions_' + currentUser.email;
            sessionStorage.setItem(keyCurrentUserJobPositions, JSON.stringify(currentUsersJobPositions));
        };
        this.userJobPositions = function (email) {
            var keyCurrentUserJobPositions = 'currentUserJobPositions_' + email;
            var currentUserJobPositions = JSON.parse(sessionStorage.getItem(keyCurrentUserJobPositions));
            return currentUserJobPositions.jobPositions;
        };
        this.hasJobPositions = function (email) {
            var keyCurrentUserJobPositions = 'currentUserJobPositions_' + email;
            var currentUserJobPositions = JSON.parse(sessionStorage.getItem(keyCurrentUserJobPositions));
            return currentUserJobPositions != null && currentUserJobPositions != undefined;
        };
        this.clearUserPosition = function (email) {
            var keyCurrentUserPosition = 'currentUserPosition_' + email;
            sessionStorage.removeItem(keyCurrentUserPosition);
        };
        this.storeUserPosition = function (currentUser, position) {
            if (currentUser == null || currentUser == undefined) return;
            if (position == null || position == undefined) return;
            var currentUsersPosition = {
                currentUser: currentUser,
                position: position
            };
            var keyCurrentUserPosition = 'currentUserPosition_' + currentUser.email;
            sessionStorage.setItem(keyCurrentUserPosition, JSON.stringify(currentUsersPosition));
        };
        this.currentPosition = function (email) {
            var keyCurrentUserPosition = 'currentUserPosition_' + email;
            var currentUsersPosition = JSON.parse(sessionStorage.getItem(keyCurrentUserPosition));
            return currentUsersPosition.position;
        };
        this.hasPosition = function (email) {
            var keyCurrentUserPosition = 'currentUserPosition_' + email;
            var currentUsersPosition = JSON.parse(sessionStorage.getItem(keyCurrentUserPosition));
            return currentUsersPosition != null && currentUsersPosition != undefined;
        };
    }
    return PositionService;
}();
exports.PositionService = PositionService = __decorate([(0, _inversify.injectable)(), __metadata("design:paramtypes", [])], PositionService);
exports.PositionService = PositionService;

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var UUIDService = function () {
    function UUIDService() {}
    return UUIDService;
}();
exports.UUIDService = UUIDService;

UUIDService.createUUID = function () {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        if (j == 8 || j == 12 || j == 16 || j == 20) result = result + '-';
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result = result + i;
    }
    return result;
};

/***/ }),

/***/ 58:
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
        _this.okClicked = function () {
            _this.setState({ showModal: false });
            _this.props.okCallBack();
        };
        _this.close = function () {
            _this.setState({ showModal: false });
            _this.props.okCallBack();
        };
        _this.open = function () {
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
        return React.createElement("div", { className: "leftFloat" }, React.createElement(_reactBootstrap.Modal, { show: this.state.showModal, onHide: this.close }, React.createElement(_reactBootstrap.Modal.Header, { closeButton: true }, React.createElement(_reactBootstrap.Modal.Title, null, this.props.headerText)), React.createElement(_reactBootstrap.Modal.Body, null, React.createElement("h4", null, this.props.bodyText)), React.createElement(_reactBootstrap.Modal.Footer, null, React.createElement(_reactBootstrap.Button, { type: 'button', bsSize: 'small', bsStyle: 'primary', onClick: this.okClicked }, "Ok"))));
    };
    return OkDialog;
}(React.Component);
exports.OkDialog = OkDialog;

/***/ })

},[426]);
//# sourceMappingURL=index.bundle.2299a41e2e3f712785de.js.map