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
    Button
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
                </Grid>
            </Well>
        );
    }



    _handleClick = (targetMarker) => {
        console.log('button on overlay clicked:' + targetMarker.key);
    }
}
