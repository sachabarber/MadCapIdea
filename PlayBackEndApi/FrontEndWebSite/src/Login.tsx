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

export interface LoginState {
    okDialogOpen: boolean;
    okDialogKey: number;
    okDialogHeaderText: string;
    okDialogBodyText: string;
}

export class Login extends React.Component<undefined, LoginState> {

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
            <Well className="outer-well">
                <Form
                    // Supply callbacks to both valid and invalid
                    // submit attempts
                    validateAll={this._validateForm}
                    onInvalidSubmit={this._handleInvalidSubmit}
                    onValidSubmit={this._handleValidSubmit}>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={10} md={6}>
                                <h4>ENTER YOUR LOGIN DETAILS</h4>
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
                                    name='password'
                                    label='Password'
                                    errorHelp='Password is invalid'/>

                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={10} md={6}>
                                <ValidatedInput
                                    type='checkbox'
                                    name='isDriver'
                                    label='Are you a driver?'
                                    />
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={10} md={6}>
                                <ButtonInput
                                    id="loginBtn"
                                    type='submit'
                                    bsSize='small'
                                    bsStyle='primary'
                                    value='Register'>Login</ButtonInput>
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
            </Well>
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

        console.log(values);

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
        var logindetails = values;
        var self = this;

        $.ajax({
            type: 'POST',
            url: 'login/validate',
            data: JSON.stringify(logindetails),
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
        })
        .done(function (jdata, textStatus, jqXHR) {
            self.setState(
                {
                    okDialogHeaderText: 'Login Successful',
                    okDialogBodyText: 'You are now logged in',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
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

    _okDialogCallBack = () => {
        this.setState(
            {
                okDialogOpen: false
            });
    }
}


