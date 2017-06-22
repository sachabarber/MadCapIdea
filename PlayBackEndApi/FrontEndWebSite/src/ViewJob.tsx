import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

import { RatingDialog } from "./components/RatingDialog";
import { YesNoDialog } from "./components/YesNoDialog";

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
                        bsSize='xsmall'
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
                            <RatingDialog
                                theId="viewJobCompleteBtn"
                                headerText="Rate your driver/passenger"/>

                            <YesNoDialog
                                theId="viewJobCancelBtn"
                                launchButtonText="Cancel"
                                yesCallBack={this._yesCallback}
                                noCallBack={this._noCallback}
                                headerText="Cancel the job"/>
                        </span>
                    </Row>
                </Grid>
            </Well>
        );
    }



    _handleClick = (targetMarker) => {
        console.log('button on overlay clicked:' + targetMarker.key);
    }

    _yesCallback = () => {
        console.log('YES CLICKED');
    }

    _noCallback = () => {
        console.log('NO CLICKED');
    }
}
