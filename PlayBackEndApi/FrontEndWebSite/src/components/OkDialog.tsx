import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import 'bootstrap/dist/css/bootstrap.css';
import
{
    Button, 
    Modal
} from "react-bootstrap";


export interface OkDialogProps {
    headerText: string;
    bodyText: string; 
    open: boolean;
    okCallBack() : void;
}

export interface OkDialogState {
    showModal: boolean;
}


export class OkDialog extends React.Component<OkDialogProps, OkDialogState> {

    constructor(props) {
        super(props);
        //set initial state
        this.state = {
            showModal: false
        };
    }

    componentDidMount() {
        if (this.props.open === true) {
            this.setState({ showModal: true });
        }
    }

    okClicked = () => {
        this.setState({ showModal: false });
        this.props.okCallBack();
    }

    close = () => {
        this.setState({ showModal: false });
        this.props.okCallBack();
    }

    open = () => {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div className="leftFloat">

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ this.props.headerText }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>{this.props.bodyText}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type='button'
                            bsSize='small'
                            bsStyle='primary'
                            onClick={this.okClicked}>Ok</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}