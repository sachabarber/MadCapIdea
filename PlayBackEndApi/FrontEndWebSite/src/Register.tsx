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
                            <h4>Please enter your registration details</h4>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <h5>STEP 1 : Choose your registration type</h5>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ButtonGroup>
                                <Button  bsSize='small' onClick={this._onOptionChange.bind(this, 'passenger')} active={this.state.option === 'passenger'}>Passenger</Button>
                                <Button  bsSize='small' onClick={this._onOptionChange.bind(this, 'driver')} active={this.state.option === 'driver'}>Driver</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            Current State { this.state.option }!
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
