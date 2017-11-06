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
    okCallBack(): void;
}

export interface RatingDialogState {
    showModal: boolean;
    rating: number;
    ratingText: string;
}


export class RatingDialog extends React.Component<RatingDialogProps, RatingDialogState> {

    constructor(props) {
        super(props);
        console.log(this.props);
        //set initial state
        this.state = {
            showModal: false,
            rating:0,
            ratingText: ''
        };
    }

    close = () => {
        this.setState(
        {
            showModal: false,
            rating:0,
            ratingText:''
        });
    }

    open = () => {
        this.setState(
        {
            showModal: true,
            rating: 0,
            ratingText:'Current rating 0'
        });
    }

    ratingChanged = (newRating) => {
        console.log(newRating)
        this.setState(
            {
                rating: newRating,
                ratingText:'Current rating ' + newRating
            });
    }

    okClicked = () => {
        this.close();
        this.props.okCallBack();
    }

    render() {
        return (

        <div className="leftFloat">

            <Button id={this.props.theId}
                    type='button'
                    bsSize='small'
                    bsStyle='primary'
                    onClick={this.open}>
                Complete
            </Button>

            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{ this.props.headerText }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Give your rating between 1-5</h4>
                    <h5>{this.state.ratingText}</h5>
                    <ReactStars count={5}
                                onChange={this.ratingChanged}
                                size={24}
                                color2={'#ffd700'} />
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit'
                            bsSize='small'
                            bsStyle='primary'
                            onClick={this.okClicked}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
}
