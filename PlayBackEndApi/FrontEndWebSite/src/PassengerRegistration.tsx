import * as React from "react";
import * as ReactDOM from "react-dom";
import { OkDialog } from "./components/OkDialog";
import 'bootstrap/dist/css/bootstrap.css';
import
{
    Well,
    Grid,
    Row,
    Col,
    ButtonInput
} from "react-bootstrap";
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import revalidator from 'revalidator';


let schema = {
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

export interface PassengerRegistrationState {
    okDialogOpen: boolean;
    okDialogKey: number;
    okDialogHeaderText: string;
    okDialogBodyText: string;
}

export class PassengerRegistration extends React.Component<undefined, PassengerRegistrationState> {

    constructor(props: any) {
        super(props);
        this.state = {
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0
        };
    }

    render() {
        return (
            <Form className="submittable-form-inner"
                // Supply callbacks to both valid and invalid
                // submit attempts
                validateAll={this._validateForm}
                onInvalidSubmit={this._handleInvalidSubmit}
                onValidSubmit={this._handleValidSubmit}>
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
                                name='fullname'
                                errorHelp='FullName is invalid'/>

                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ValidatedInput type='text'
                                label='Email'
                                name='email'
                                errorHelp='Email address is invalid'/>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ValidatedInput type='password'
                                label='Password'
                                name='password'
                                errorHelp='Password is invalid'/>
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
                                open= {this.state.okDialogOpen}
                                okCallBack= {this._okDialogCallBack}
                                headerText={this.state.okDialogHeaderText}
                                bodyText={this.state.okDialogBodyText}
                                key={this.state.okDialogKey}/>
                        </span>
                    </Row>
                </Grid>
            </Form>
        )
    }

    _validateForm = (values) => {
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

    _handleInvalidSubmit = (errors, values) => {
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

    _handleValidSubmit = (values) => {
        var passenger = values;
        var self = this;

        $.ajax({
            type: 'POST',
            url: 'registration/save/passenger',
            data: JSON.stringify(passenger),
            contentType: "application/json; charset=utf-8",
            success: function () {
                self.setState(
                    {
                        okDialogHeaderText: 'Registration Successful',
                        okDialogBodyText: 'You are now registered',
                        okDialogOpen: true,
                        okDialogKey: Math.random()
                    });
            },
            dataType: 'json'
        })
        .fail(function () {
            self.setState(
                {
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: 'An error occurred trying to register',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
        });
    }

    _okDialogCallBack = () => {
        this.setState(
            {
                okDialogOpen: false
            });
    }
}


