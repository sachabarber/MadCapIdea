import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {
    Well,
    Grid,
    Row,
    Col,
    ButtonInput,
    ButtonGroup,
    Button
} from "react-bootstrap";
import { AuthService } from "./services/AuthService";
import { hashHistory } from 'react-router';
import { PassengerRegistration } from "./PassengerRegistration";
import { DriverRegistration } from "./DriverRegistration";


export interface RegisterState {
    option: string;
}

export class Register extends React.Component<undefined, RegisterState> {

    private _authService: AuthService;

    constructor(props: any) {
        super(props);
        this._authService = props.route.authService;
        this.state = {
            option: 'passenger'
        };
    }

    render() {
        return (
            <Well className="outer-well">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <h4>PLEASE ENTER YOUR REGISTRATION DETAILS</h4>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <h6>Choose your registration type </h6>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ButtonGroup>
                                <Button bsSize='small' onClick={this._onOptionChange.bind(this, 'passenger')} active={this.state.option === 'passenger'}>Passenger</Button>
                                <Button bsSize='small' onClick={this._onOptionChange.bind(this, 'driver')} active={this.state.option === 'driver'}>Driver</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            {this.state.option === 'passenger' ?
                                <div><PassengerRegistration authService={this._authService} /></div> :
                                <div><DriverRegistration authService={this._authService} /></div>
                            }
                        </Col>
                    </Row>
                </Grid>
            </Well>
        )
    }

    _onOptionChange(option) {
        this.setState({
            option: option
        });
    }

}