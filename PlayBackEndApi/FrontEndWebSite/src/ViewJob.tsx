import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import Measure from 'react-measure'
import { RatingDialog } from "./components/RatingDialog";
import { YesNoDialog } from "./components/YesNoDialog";
import { OkDialog } from "./components/OkDialog";
import 'bootstrap/dist/css/bootstrap.css';
import {
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
import { AuthService } from "./services/AuthService";
import { JobStreamService } from "./services/JobStreamService";
import { PositionService } from "./services/PositionService";
import { Position } from "./domain/Position";
import { hashHistory } from 'react-router';
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
        defaultCenter={{ lat: 50.8202949, lng: -0.1406958 }}
        onClick={props.onMapClick}>
        {props.markers.map((marker, index) => (
            <OverlayView
                key={marker.key}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                position={marker.position}
                getPixelPositionOffset={GetPixelPositionOffset}>
                <div style={STYLES.overlayView}>
                    <img src={marker.icon} />
                    <strong>{marker.key}</strong>
                    <br />
                    <Button
                        type='button'
                        bsSize='xsmall'
                        bsStyle='primary'
                        onClick={() => props.onMarkerClick(marker)}
                        value='Accept'>Accept</Button>
                </div>
            </OverlayView>
        ))}
    </GoogleMap>
));


class PositionMarker {

    position: Position;
    key: string;
    icon: string;

    constructor(position: Position, key: string, icon: string) {
        this.position = position;
        this.key = key;
        this.icon = icon;
    }

}


export interface ViewJobState {
    markers: Array<PositionMarker>;
    okDialogOpen: boolean;
    okDialogKey: number;
    okDialogHeaderText: string;
    okDialogBodyText: string;
    dimensions: {
        width: number,
        height: number
    },
    currentPosition: Position;
}

export class ViewJob extends React.Component<undefined, ViewJobState> {

    private _authService: AuthService;
    private _jobStreamService: JobStreamService;
    private _positionService: PositionService;
    private _subscription: any; 

    constructor(props: any) {
        super(props);
        this._authService = props.route.authService;
        this._jobStreamService = props.route.jobStreamService;
        this._positionService = props.route.positionService;
        
        if (!this._authService.isAuthenticated()) {
            hashHistory.push('/');
        }
        this.state = {

            //TODO : 1. This should not be hard coded
            //TODO : 2. We should push out current job when we FIRST LOAD this page
            //          if we are a client, and we should enrich it if we are a driver
            //       3. The list of markers should be worked out again every time based
            //          on RX stream messages

            markers: [
                new PositionMarker(
                    new Position(50.8202949, -0.1406958),
                    'driver_1', '/assets/images/driver.png'),
                new PositionMarker(
                    new Position(50.8128187, -0.1361418),
                    'driver_2', '/assets/images/driver.png')
            ],
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            dimensions: { width: -1, height: -1 },
            currentPosition: this._positionService.currentPosition(
                this._authService.userEmail())
        };
    }

    componentWillMount() {
        this._subscription =
            this._jobStreamService.getJobStream()
            .subscribe(
                jobArgs => {
                    console.log('RX saw onJobChanged');
                    console.log('RX x = ', jobArgs.detail);
                },
                error => {
                    console.log('RX saw ERROR');
                    console.log('RX error = ', error);
                },
                () => {
                    console.log('RX saw COMPLETE');
                }
            );
    }

    componentWillUnmount() {
        this._subscription.dispose();
    }


    render() {

        const adjustedwidth = this.state.dimensions.width;

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
                            <Measure
                                bounds
                                onResize={(contentRect) => {
                                    this.setState({ dimensions: contentRect.bounds })
                                }}
                            >
                                {({ measureRef }) =>
                                    <div ref={measureRef}>
                                        <ViewJobGoogleMap
                                            containerElement={
                                                <div style={{
                                                    position: 'relative',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    width: { adjustedwidth },
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
                                                    width: { adjustedwidth },
                                                    height: 600,
                                                    marginTop: 20,
                                                    marginLeft: 0,
                                                    marginRight: 0,
                                                    marginBottom: 20
                                                }} />
                                            }
                                            markers={this.state.markers}
                                            onMapClick={this._handleMapClick}
                                            onMarkerClick={this._handleMarkerClick} />
                                    </div>
                                }
                            </Measure>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <span>
                            <RatingDialog
                                theId="viewJobCompleteBtn"
                                headerText="Rate your driver/passenger"
                                okCallBack={this._ratingsDialogOkCallBack} />

                            <YesNoDialog
                                theId="viewJobCancelBtn"
                                launchButtonText="Cancel"
                                yesCallBack={this._jobCancelledCallBack}
                                noCallBack={this._jobNotCancelledCallBack}
                                headerText="Cancel the job" />

                            <OkDialog
                                open={this.state.okDialogOpen}
                                okCallBack={this._okDialogCallBack}
                                headerText={this.state.okDialogHeaderText}
                                bodyText={this.state.okDialogBodyText}
                                key={this.state.okDialogKey} />
                        </span>
                    </Row>
                </Grid>
            </Well>
        );
    }

    _handleMarkerClick = (targetMarker) => {
        console.log('button on overlay clicked:' + targetMarker.key);
    }

    _handleMapClick = (event) => {
        const newState = Object.assign({}, this.state, {
            currentPosition: new Position(event.latLng.lat(), event.latLng.lng())
        })
        this.setState(newState)
    }

    _ratingsDialogOkCallBack = () => {
        console.log('RATINGS OK CLICKED');
        this.setState(
            {
                okDialogHeaderText: 'Ratings',
                okDialogBodyText: 'Rating successfully recorded',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
    }

    _jobCancelledCallBack = () => {
        console.log('YES CLICKED');
        this.setState(
            {
                okDialogHeaderText: 'Job Cancellaton',
                okDialogBodyText: 'Job successfully cancelled',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
    }

    _jobNotCancelledCallBack = () => {
        console.log('NO CLICKED');
        this.setState(
            {
                okDialogHeaderText: 'Job Cancellaton',
                okDialogBodyText: 'Job remains open',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
    }

    _okDialogCallBack = () => {
        console.log('OK on OkDialog CLICKED');
        this.setState(
            {
                okDialogOpen: false
            });
    }
}