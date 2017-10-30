import * as React from "react";
import * as ReactDOM from "react-dom";
import { OkDialog } from "./components/OkDialog";
import 'bootstrap/dist/css/bootstrap.css';
import {
    Well,
    Grid,
    Row,
    Col,
    ButtonInput
} from "react-bootstrap";
import { AuthService } from "./services/AuthService";
import { hashHistory } from 'react-router';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import revalidator from 'revalidator';


let schema = {
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


export interface PassengerRegistrationProps {
    authService: AuthService;
}


export interface PassengerRegistrationState {
    okDialogOpen: boolean;
    okDialogKey: number;
    okDialogHeaderText: string;
    okDialogBodyText: string;
    wasSuccessful: boolean;
}

export class PassengerRegistration extends React.Component<PassengerRegistrationProps, PassengerRegistrationState> {

    constructor(props: any) {
        super(props);
        this.state = {
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            wasSuccessful: false
        };
    }

    render() {
        return (
            <Form className="submittable-form-inner"
                // Supply callbacks to both valid and invalid
                // submit attempts
                validateAll={this.validateForm}
                onInvalidSubmit={this.handleInvalidSubmit}
                onValidSubmit={this.handleValidSubmit}>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <h4>Passenger details</h4>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ValidatedInput type='text'
                                label='FullName'
                                name='fullName'
                                errorHelp='FullName is invalid' />

                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ValidatedInput type='text'
                                label='Email'
                                name='email'
                                errorHelp='Email address is invalid' />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ValidatedInput type='password'
                                label='Password'
                                name='password'
                                errorHelp='Password is invalid' />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ButtonInput
                                id="registerBtn"
                                type='submit'
                                bsSize='small'
                                bsStyle='primary'
                                value='Register'>Register</ButtonInput>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <span>
                            <OkDialog
                                open={this.state.okDialogOpen}
                                okCallBack={this.okDialogCallBack}
                                headerText={this.state.okDialogHeaderText}
                                bodyText={this.state.okDialogBodyText}
                                key={this.state.okDialogKey} />
                        </span>
                    </Row>
                </Grid>
            </Form>
        )
    }

    validateForm = (values) => {
        let res = revalidator.validate(values, schema);

        // If the values passed validation, we return true
        if (res.valid) {
            return true;
        }

        // Otherwise we should return an object containing errors
        // e.g. { email: true, password: true }
        return res.errors.reduce((errors, error) => {
            // Set each property to either true or
            // a string error description
            errors[error.property] = true;

            return errors;
        }, {});
    }

    handleInvalidSubmit = (errors, values) => {
        // Errors is an array containing input names
        // that failed to validate
        this.setState(
            {
                okDialogHeaderText: 'Validation Error',
                okDialogBodyText: 'Form has errors and may not be submitted',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
    }

    handleValidSubmit = (values) => {
        var passenger = values;
        var self = this;

        $.ajax({
            type: 'POST',
            url: 'registration/save/passenger',
            data: JSON.stringify(passenger),
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
        })
        .done(function (jdata, textStatus, jqXHR) {
            var redactedPassenger = passenger;
            redactedPassenger.password = "";
            console.log("redacted ${redactedPassenger}");
            console.log(redactedPassenger);
            console.log("Auth Service");
            console.log(self.props.authService);
            let userProfile = {
                isDriver: false,
                user: redactedPassenger
            };
            self.setState(
                {
                    wasSuccessful: true,
                    okDialogHeaderText: 'Registration Successful',
                    okDialogBodyText: 'You are now registered',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
            self.props.authService.storeUser(userProfile);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            self.setState(
                {
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: jqXHR.responseText,
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
        });
    }

    okDialogCallBack = () => {
        this.setState(
            {
                okDialogOpen: false
            });

        if (this.state.wasSuccessful) {
            hashHistory.push('/');
        }
    }
}

