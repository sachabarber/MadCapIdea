import * as React from "react";
import * as ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';
import
{
    Well,
    Grid,
    Row,
    Col,
    ButtonInput,
    ButtonGroup,
    Button
} from "react-bootstrap";

import { PassengerRegistration } from "./PassengerRegistration";
import { DriverRegistration } from "./DriverRegistration";


export interface RegisterState {
    option: any;
}


export class Register extends React.Component<any, RegisterState> {

    constructor(props: any){
        super(props);
        this.state = { option: "passenger" };
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
                            <h5>Choose your registration type</h5>
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
                               <div><PassengerRegistration/></div> :
                               <div><DriverRegistration/></div>
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
