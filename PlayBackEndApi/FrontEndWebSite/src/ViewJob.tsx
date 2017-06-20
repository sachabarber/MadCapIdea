import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

import 'bootstrap/dist/css/bootstrap.css';
import
{
    Well,
    Grid,
    Row,
    Col,
    ButtonInput,
    ButtonGroup,
    Button, 
    Modal,
    Popover,
    Tooltip,
    OverlayTrigger
} from "react-bootstrap";

import { withGoogleMap, GoogleMap, Marker, OverlayView } from "react-google-maps";

const STYLES = {
    overlayView: {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 15,
    }
}


const GetPixelPositionOffset = (width, height) => {
    return { x: -(width / 2), y: -(height / 2) };
}



const ViewJobGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        defaultCenter={{ lat: 50.8202949, lng: -0.1406958 }}>


        {props.markers.map((marker, index) => (
            <OverlayView
                key={marker.key}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                position={marker.position}
                getPixelPositionOffset={GetPixelPositionOffset}>
                <div style={STYLES.overlayView}>
                    <img src={marker.icon} />
                    <strong>{marker.key}</strong>
                    <br/>
                    <Button
                        type='button'
                        bsSize='small'
                        bsStyle='primary'
                        onClick={() => props.onMarkerClick(marker) }
                        value='Accept'>Accept</Button>
                </div>
            </OverlayView>
        )) }
    </GoogleMap>
));



const ModalExample = React.createClass({
    getInitialState() {
        return { showModal: false };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover.such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );

        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                    >
                    Launch demo modal
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                        <h4>Popover in a modal</h4>
                        <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

                        <h4>Tooltips in a modal</h4>
                        <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

                        <hr />

                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>Cras mattis consectetur purus sit amet fermentum.Cras justo odio, dapibus ac facilisis in, egestas eget quam.Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum.Cras justo odio, dapibus ac facilisis in, egestas eget quam.Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum.Cras justo odio, dapibus ac facilisis in, egestas eget quam.Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});








//TODO : make this correct
//see https://tomchentw.github.io/react-google-maps/
//
//state = {
//    overlays: [{
//      position: {
//        lat: 25.0112183,
//        lng: 121.52067570000001,
//      }
//    }],
//  };

export interface ViewJobState {
    markers: any;
}

export class ViewJob extends React.Component<undefined, ViewJobState> {

    constructor(props: any) {
        super(props);
        this.state = {
            markers: [{
                    position: {
                        lat: 50.8202949,
                        lng: -0.1406958
                    },
                    key: 'driver_1',
                    icon: '/assets/images/driver.png'
                },
                {
                    position: {
                        lat: 50.8128187,
                        lng: -0.1361418
                    },
                    key: 'driver_2',
                    icon: '/assets/images/driver.png'
                }
            ]
        };
    }


    render() {
        return (
            <Well className="outer-well">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <h4>CURRENT JOB</h4>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ViewJobGoogleMap
                                containerElement={
                                    <div style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        width: 600,
                                        height: 600,
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        marginTop: 20,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 20
                                    }} />
                                }
                                mapElement={
                                    <div style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        width: 600,
                                        height: 600,
                                        marginTop: 20,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 20
                                    }} />
                                }
                                markers={this.state.markers}
                                onMarkerClick={this._handleClick}/>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <span>
                            <Button
                                id="viewJobCompleteBtn"
                                type='button'
                                bsSize='small'
                                bsStyle='primary'
                                value='Complete'>Complete Job</Button>
                            <Button
                                id="viewJobCancelBtn"
                                type='button'
                                bsSize='small'
                                bsStyle='primary'
                                value='Cancel'>Cancel Job</Button>
                        </span>
                    </Row>
                    <Row className="show-grid">
                        <ModalExample/>
                    </Row>
                </Grid>
            </Well>
        );
    }



    _handleClick = (targetMarker) => {
        console.log('button on overlay clicked:' + targetMarker.key);
    }
}
