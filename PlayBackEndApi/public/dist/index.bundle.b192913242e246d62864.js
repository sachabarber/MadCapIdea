webpackJsonp([1],{

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CreateJob = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

var _reactGoogleMaps = __webpack_require__(365);

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

var CreateJobGoogleMap = (0, _reactGoogleMaps.withGoogleMap)(function (props) {
    return React.createElement(_reactGoogleMaps.GoogleMap, { ref: props.onMapLoad, defaultZoom: 16, defaultCenter: { lat: 50.8202949, lng: -0.1406958 }, onClick: props.onMapClick }, React.createElement(_reactGoogleMaps.Marker, { position: props.currentPosition, icon: '/assets/images/passenger.png' }));
});
var CreateJob = function (_super) {
    __extends(CreateJob, _super);
    function CreateJob(props) {
        var _this = _super.call(this, props) || this;
        _this._handleMapLoad = function (map) {
            if (map) {
                console.log(map.getZoom());
            }
        };
        _this._handleMapClick = function (event) {
            _this.setState({
                currentPosition: event.latLng
            });
        };
        _this.state = {
            currentPosition: { lat: 50.8202949, lng: -0.1406958 }
        };
        return _this;
    }
    CreateJob.prototype.render = function () {
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "SET YOUR CURRENT LOCATION"), React.createElement("h6", null, "Click the map to set your current location"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(CreateJobGoogleMap, { containerElement: React.createElement("div", { style: {
                    position: 'relative',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: 600,
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
                    width: 600,
                    height: 600,
                    marginTop: 20,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 20
                } }), onMapLoad: this._handleMapLoad, onMapClick: this._handleMapClick, currentPosition: this.state.currentPosition }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.ButtonInput, { id: "createJobBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Create Job"))));
    };
    return CreateJob;
}(React.Component);
exports.CreateJob = CreateJob;

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Login = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

var _reactBootstrapValidation = __webpack_require__(187);

var _revalidator = __webpack_require__(220);

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
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
            alert("Form has errors and may not be submitted");
        };
        _this._handleValidSubmit = function (values) {
            // Values is an object containing all values
            // from the inputs
            console.log("Form may be submitted");
            console.log(values);
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
            validateAll: this._validateForm, onInvalidSubmit: this._handleInvalidSubmit, onValidSubmit: this._handleValidSubmit }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "ENTER YOUR LOGIN DETAILS"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', name: 'password', label: 'Password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "loginBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Login"))))));
    };
    return Login;
}(React.Component);
exports.Login = Login;

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Register = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

var _PassengerRegistration = __webpack_require__(392);

var _DriverRegistration = __webpack_require__(391);

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
        _this.state = { option: "passenger" };
        return _this;
    }
    Register.prototype.render = function () {
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "PLEASE ENTER YOUR REGISTRATION DETAILS"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h5", null, "Choose your registration type "))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonGroup, null, React.createElement(_reactBootstrap.Button, { bsSize: 'small', onClick: this._onOptionChange.bind(this, 'passenger'), active: this.state.option === 'passenger' }, "Passenger"), React.createElement(_reactBootstrap.Button, { bsSize: 'small', onClick: this._onOptionChange.bind(this, 'driver'), active: this.state.option === 'driver' }, "Driver")))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, this.state.option === 'passenger' ? React.createElement("div", null, React.createElement(_PassengerRegistration.PassengerRegistration, null)) : React.createElement("div", null, React.createElement(_DriverRegistration.DriverRegistration, null))))));
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

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ViewJob = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _RatingDialog = __webpack_require__(394);

var _YesNoDialog = __webpack_require__(395);

var _OkDialog = __webpack_require__(393);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

var _reactGoogleMaps = __webpack_require__(365);

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
        _this._handleClick = function (targetMarker) {
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
            okDialogKey: 0
        };
        return _this;
    }
    ViewJob.prototype.render = function () {
        return React.createElement(_reactBootstrap.Well, { className: "outer-well" }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "CURRENT JOB"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(ViewJobGoogleMap, { containerElement: React.createElement("div", { style: {
                    position: 'relative',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: 600,
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
                    width: 600,
                    height: 600,
                    marginTop: 20,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 20
                } }), markers: this.state.markers, onMarkerClick: this._handleClick }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement("span", null, React.createElement(_RatingDialog.RatingDialog, { theId: "viewJobCompleteBtn", headerText: "Rate your driver/passenger", okCallBack: this._ratingsDialogOkCallBack }), React.createElement(_YesNoDialog.YesNoDialog, { theId: "viewJobCancelBtn", launchButtonText: "Cancel", yesCallBack: this._jobCancelledCallBack, noCallBack: this._jobNotCancelledCallBack, headerText: "Cancel the job" }), React.createElement(_OkDialog.OkDialog, { open: this.state.okDialogOpen, okCallBack: this._okDialogCallBack, headerText: this.state.okDialogHeaderText, bodyText: this.state.okDialogBodyText, key: this.state.okDialogKey })))));
    };
    return ViewJob;
}(React.Component);
exports.ViewJob = ViewJob;

/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DriverRegistration = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

var _reactBootstrapValidation = __webpack_require__(187);

var _revalidator = __webpack_require__(220);

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
        fullname: {
            type: 'string',
            minLength: 8,
            maxLength: 12,
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
    function DriverRegistration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
            alert("Form has errors and may not be submitted");
        };
        _this._handleValidSubmit = function (values) {
            // Values is an object containing all values
            // from the inputs
            console.log("Form may be submitted");
            console.log(values);
        };
        return _this;
    }
    DriverRegistration.prototype.render = function () {
        return React.createElement(_reactBootstrapValidation.Form, { className: "submittable-form-inner",
            // Supply callbacks to both valid and invalid
            // submit attempts
            validateAll: this._validateForm, onInvalidSubmit: this._handleInvalidSubmit, onValidSubmit: this._handleValidSubmit }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Driver details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'FullName', name: 'fullname', errorHelp: 'FullName is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', name: 'password', label: 'Password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Vehicle details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Vehicle Description', name: 'vehicleDescription', errorHelp: 'Vehicle description is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Vehicle Registration Number', name: 'vehicleRegistrationNumber', errorHelp: 'Vehicle registration number is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "registerBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Register")))));
    };
    return DriverRegistration;
}(React.Component);
exports.DriverRegistration = DriverRegistration;

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PassengerRegistration = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

var _reactBootstrapValidation = __webpack_require__(187);

var _revalidator = __webpack_require__(220);

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
        fullname: {
            type: 'string',
            minLength: 8,
            maxLength: 12,
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
    function PassengerRegistration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
            alert("Form has errors and may not be submitted");
        };
        _this._handleValidSubmit = function (values) {
            // Values is an object containing all values
            // from the inputs
            console.log("Form may be submitted");
            console.log(values);
        };
        return _this;
    }
    PassengerRegistration.prototype.render = function () {
        return React.createElement(_reactBootstrapValidation.Form, { className: "submittable-form-inner",
            // Supply callbacks to both valid and invalid
            // submit attempts
            validateAll: this._validateForm, onInvalidSubmit: this._handleInvalidSubmit, onValidSubmit: this._handleValidSubmit }, React.createElement(_reactBootstrap.Grid, null, React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement("h4", null, "Passenger details"))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'FullName', name: 'fullname', errorHelp: 'FullName is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'text', label: 'Email', name: 'email', errorHelp: 'Email address is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrapValidation.ValidatedInput, { type: 'password', label: 'Password', name: 'password', errorHelp: 'Password is invalid' }))), React.createElement(_reactBootstrap.Row, { className: "show-grid" }, React.createElement(_reactBootstrap.Col, { xs: 10, md: 6 }, React.createElement(_reactBootstrap.ButtonInput, { id: "registerBtn", type: 'submit', bsSize: 'small', bsStyle: 'primary', value: 'Register' }, "Register")))));
    };
    return PassengerRegistration;
}(React.Component);
exports.PassengerRegistration = PassengerRegistration;

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OkDialog = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

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
        console.log(_this.props);
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

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RatingDialog = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

var _reactStars = __webpack_require__(848);

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
                rating: 0
            });
        };
        _this._open = function () {
            _this.setState({
                showModal: true,
                rating: 0
            });
        };
        _this._ratingChanged = function (newRating) {
            console.log(newRating);
            _this.setState({
                rating: newRating
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
            rating: 0
        };
        return _this;
    }
    RatingDialog.prototype.render = function () {
        return React.createElement("div", { className: "leftFloat" }, React.createElement(_reactBootstrap.Button, { id: this.props.theId, type: 'button', bsSize: 'small', bsStyle: 'primary', onClick: this._open }, "Complete"), React.createElement(_reactBootstrap.Modal, { show: this.state.showModal, onHide: this._close }, React.createElement(_reactBootstrap.Modal.Header, { closeButton: true }, React.createElement(_reactBootstrap.Modal.Title, null, this.props.headerText)), React.createElement(_reactBootstrap.Modal.Body, null, React.createElement("h4", null, "Give your rating between 1-5"), React.createElement(_reactStars2.default, { count: 5, onChange: this._ratingChanged, size: 24, color2: '#ffd700' })), React.createElement(_reactBootstrap.Modal.Footer, null, React.createElement(_reactBootstrap.Button, { type: 'submit', bsSize: 'small', bsStyle: 'primary', onClick: this._okClicked }, "Ok"))));
    };
    return RatingDialog;
}(React.Component);
exports.RatingDialog = RatingDialog;

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YesNoDialog = undefined;

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

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

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(19);

var ReactDOM = _interopRequireWildcard(_reactDom);

__webpack_require__(35);

var _reactBootstrap = __webpack_require__(33);

var _reactRouter = __webpack_require__(390);

var _Login = __webpack_require__(387);

var _Register = __webpack_require__(388);

var _CreateJob = __webpack_require__(386);

var _ViewJob = __webpack_require__(389);

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
        return React.createElement(_reactBootstrap.Navbar, null, React.createElement(_reactBootstrap.Nav, null, React.createElement(_reactBootstrap.NavItem, { eventKey: 1, href: '#/' }, "Login"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/register' }, "Register"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/createjob' }, "CreateJob"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/viewJob' }, "ViewJob"), React.createElement(_reactBootstrap.NavItem, { eventKey: 2, href: '#/redirecter' }, "Redirect")));
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
            _reactRouter.hashHistory.push('/');
        };
        return _this;
    }
    ReDirecter.prototype.render = function () {
        return React.createElement(_reactBootstrap.Button, { bsStyle: "primary", bsSize: "large", onClick: this.handleClick }, "Go to Login");
    };
    return ReDirecter;
}(React.Component);
var About = function About() {
    return React.createElement("div", null, React.createElement("h2", null, "About"));
};
ReactDOM.render(React.createElement(_reactRouter.Router, { history: _reactRouter.hashHistory }, React.createElement(_reactRouter.Route, { component: App }, React.createElement(_reactRouter.Route, { path: "/", component: _Login.Login }), React.createElement(_reactRouter.Route, { path: "/register", component: _Register.Register }), React.createElement(_reactRouter.Route, { path: "/createjob", component: _CreateJob.CreateJob }), React.createElement(_reactRouter.Route, { path: "/viewjob", component: _ViewJob.ViewJob }), React.createElement(_reactRouter.Route, { path: "/redirecter", component: ReDirecter }))), document.getElementById('root'));

/***/ })

},[396]);
//# sourceMappingURL=index.bundle.b192913242e246d62864.js.map