import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import 'bootstrap/dist/css/bootstrap.css';
import { PositionMarker } from "../domain/PositionMarker";
import
{
    Button, 
    Modal
} from "react-bootstrap";


export interface AcceptButtonProps {
    mouseEnterCallback(): void;
    mouseLeaveCallback(): void;
    clickCallback(marker: PositionMarker): void;
    marker: PositionMarker
}

const GetAcceptButtonCss = (isDriverIcon: boolean, currentUserIsDriver: boolean): string => {

    if (!currentUserIsDriver && isDriverIcon) {
        return "displayBlock";
    }
    else {
        return "displayNone";
    }
}


export class AcceptButton extends React.Component<AcceptButtonProps, undefined> {

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    mouseEvent = () => {
        console.log("mouseEvent");
        this.props.mouseEnterCallback();
    }

    mouseLeave = () => {
        console.log("mouseLeave");
        this.props.mouseLeaveCallback();
    }

    click = () => {
        console.log("click");
        this.props.clickCallback(this.props.marker);
    }


    render() {
        return (
            <Button
                type='button'
                bsSize='xsmall'
                bsStyle='primary'
                className={GetAcceptButtonCss(this.props.marker.isDriverIcon, this.props.marker.currentUserIsDriver)}
                onMouseEnter={() => this.mouseEvent()}
                onMouseLeave={() => this.mouseLeave()}
                value='Accept'>Accept</Button>
        );
    }
}