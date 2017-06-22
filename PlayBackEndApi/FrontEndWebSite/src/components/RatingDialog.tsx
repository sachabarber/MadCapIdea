import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

import 'bootstrap/dist/css/bootstrap.css';
import
{
    Button, 
    Modal
} from "react-bootstrap";


import ReactStars from 'react-stars';


export interface RatingDialogProps {
    headerText: string;
    theId: string;
}

export interface RatingDialogState {
    showModal: boolean;
}


export class RatingDialog extends React.Component<RatingDialogProps, RatingDialogState> {

    constructor(props) {
        super(props);
        console.log(this.props); 
        //set initial state
        this.state = {
            showModal: false
        };
    }

    _close = () => {
        this.setState({ showModal: false });
    }

    _open = () => {
        this.setState({ showModal: true });
    }

    _ratingChanged = (newRating) => {
        console.log(newRating)
    }

    render() {
        return (
            <div className="leftFloat">

                <Button
                    id={this.props.theId}
                    type='button'
                    bsSize='small'
                    bsStyle='primary'
                    onClick={this._open}>Complete</Button>

                <Modal show={this.state.showModal} onHide={this._close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ this.props.headerText }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Give your rating between 1-5</h4>
                        <ReactStars count={5}
                                    onChange={this._ratingChanged}
                                    size={24}
                                    color2={'#ffd700'} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type='submit'
                            bsSize='small'
                            bsStyle='primary'
                            onClick={this._close}>Ok</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}