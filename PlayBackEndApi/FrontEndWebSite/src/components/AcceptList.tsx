import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import { PositionMarker } from "../domain/PositionMarker";
import 'bootstrap/dist/css/bootstrap.css';
import
{
    Button, 
    Modal,
    Grid,
    Row,
    Col
} from "react-bootstrap";


export interface AcceptListProps {
    markers: PositionMarker[];
    currentUserIsDriver: boolean;
    clickCallback(marker: PositionMarker): void;
}

export interface AcceptListState {
    value: string;
}


export class AcceptList extends React.Component<AcceptListProps, AcceptListState> {

    constructor(props) {
        super(props);
        console.log(this.props);
        //set initial state
        this.state = {
            value: ''
        };
    }

    getAcceptButtonCss = (currentUserIsDriver: boolean): string => {

        if (this.props.markers.length == 0 || this.props.markers == undefined) {
            return "displayNone";
        }

        if (!currentUserIsDriver) {
            return "displayBlock";
        }
        else {
            return "displayNone";
        }
    }

    onButtonClick = (): void => {
        let marker = _.find(this.props.markers, { name: this.state.value });
        this.props.clickCallback(marker);
    }

    onChange = (event): void => {
        this.setState({ value: event.target.value });
    }

    forceUpdateToSelectedItem = (): void => {
        if (this.props.markers.length > 0 && this.state.value == '') {
            this.setState({ value: this.props.markers[0].key});
        }
    }

    render() {

        this.forceUpdateToSelectedItem();

        return (
            <div className={this.getAcceptButtonCss(this.props.currentUserIsDriver)}>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={6} md={4}>
                            <select name='acceptItems'
                                value={this.state.value}
                                onChange={this.onChange}>
                                {this.props.markers.map(fbb =>
                                    <option key={fbb.key} value={fbb.name}>{fbb.name}</option>
                                )};
                            </select>
                        </Col>
                        <Col xs={6} md={8}>
                            <Button
                                onClick={this.onButtonClick}
                                type='button'
                                bsSize='xsmall'
                                bsStyle='primary'>Accept</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}