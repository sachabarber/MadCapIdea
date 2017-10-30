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
import { PositionMarker } from "./domain/PositionMarker";
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

const GetAcceptButtonCss = (isDriver:boolean): string => {
    return isDriver ? "displayNone" : "displayBlock";
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
                        className={GetAcceptButtonCss(marker.isDriver)}
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

        //TODO : remove this
        //this._positionService.storeUserJobPositions(
        //    this._authService.userEmail(),
        //    [
        //        new PositionMarker(
        //            'driver_1',
        //            new Position(50.8202949, -0.1406958),
        //            "driver_1",
        //            "drive1@here.com",
        //            '/assets/images/driver.png',
        //            true
        //        ),
        //        new PositionMarker(
        //            'driver_2',
        //            new Position(50.8128187, -0.1361418),
        //            "driver_2",
        //            "drive2@here.com",
        //            '/assets/images/driver.png',
        //            true
        //        )
        //    ]);


        let savedMarkers: Array<PositionMarker> = new Array<PositionMarker>();
        if (this._positionService.hasJobPositions(this._authService.userEmail())) {
            savedMarkers = this._positionService.userJobPositions(this._authService.userEmail());
        }

        this.state = {
            markers: savedMarkers,
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            dimensions: { width: -1, height: -1 },
            currentPosition: this._authService.isDriver() ? null :
                this._positionService.currentPosition(
                this._authService.userEmail())
        };
    }

    componentWillMount() {
        this._subscription =
            this._jobStreamService.getJobStream()
            .subscribe(
            jobArgs => {

                    //TODO : 1. This should not be hard coded
                    //TODO : 2. We should push out current job when we FIRST LOAD this page
                    //          if we are a client, and we should enrich it if we are a driver
                    //       3. The list of markers should be worked out again every time based
                    //          on RX stream messages
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
        this._positionService.storeUserJobPositions(this._authService.user, this.state.markers);
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
                                }}>
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
                                            onMapClick={this.handleMapClick}
                                            onMarkerClick={this.handleMarkerClick} />
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
                                okCallBack={this.ratingsDialogOkCallBack} />

                            <YesNoDialog
                                theId="viewJobCancelBtn"
                                launchButtonText="Cancel"
                                yesCallBack={this.jobCancelledCallBack}
                                noCallBack={this.jobNotCancelledCallBack}
                                headerText="Cancel the job" />

                            <OkDialog
                                open={this.state.okDialogOpen}
                                okCallBack={this.okDialogCallBack}
                                headerText={this.state.okDialogHeaderText}
                                bodyText={this.state.okDialogBodyText}
                                key={this.state.okDialogKey} />
                        </span>
                    </Row>
                </Grid>
            </Well>
        );
    }

    handleMarkerClick = (targetMarker) => {
        console.log('button on overlay clicked:' + targetMarker.key);
    }

    handleMapClick = (event) => {

        let currentUser = this._authService.user();
        let isDriver = this._authService.isDriver();
        let matchedMarker = _.find(this.state.markers, { 'email': currentUser.email });
        
        if (matchedMarker != undefined) {
            let newMarkersList = this.state.markers;
            _.remove(newMarkersList, function (n) {
                return n.email === matchedMarker.email;
            });
            matchedMarker.position = new Position(event.latLng.lat(), event.latLng.lng());
            newMarkersList.push(matchedMarker);
            const newState = Object.assign({}, this.state, {
                currentPosition: new Position(event.latLng.lat(), event.latLng.lng()),
                markers: newMarkersList
            })
            this.setState(newState);
        }
        else {
            if (isDriver) {
                let newDriverMarker =
                    this.createMarker(currentUser.fullName, currentUser.email, isDriver, event);
                let newMarkersList = this.state.markers;
                newMarkersList.push(newDriverMarker);
                const newState = Object.assign({}, this.state, {
                    currentPosition: new Position(event.latLng.lat(), event.latLng.lng()),
                    markers: newMarkersList
                })
                this.setState(newState);
            }
        }
        this._positionService.clearUserJobPositions(currentUser.email);
        this._positionService.storeUserJobPositions(currentUser.email, this.state.markers);


        //TODO : We should push out Job here based on whether current user was driver/client
        //TODO : We should push out Job here based on whether current user was driver/client
        //TODO : We should push out Job here based on whether current user was driver/client
        //TODO : We should push out Job here based on whether current user was driver/client
        //TODO : We should push out Job here based on whether current user was driver/client

    }


    createMarker = (fullname: string, email: string, isDriver: boolean, event: any, ): PositionMarker => {
        return new PositionMarker(
            fullname,
            new Position(event.latLng.lat(), event.latLng.lng()),
            fullname,
            email,
            this.createIcon(isDriver),
            isDriver
        );
    }

    createIcon = (isDriver: boolean): string => {
        return isDriver ? '/assets/images/driver.png' : '/assets/images/passenger.png';
    }

    addMarkerForJob = (jobArgs: any): void => {
        //TODO : should see if the client/driver for the job is in the list if it is remove it
        //TODO : add it
        //TODO : Update the list of position markers in the PositionService

    }

    shouldShowMarkerForJob = (jobArgs: any): boolean => {

        //TODO
        //1. If the current job client is the current client logged in
        //2. If the current job driver is the current driver logged in
        //3. If the job isAssigned and its for the current logged in client/driver
        //4. Or if the job is unassigned and if there is no other active job for this client/driver
        return true;
    }

    ratingsDialogOkCallBack = () => {
        console.log('RATINGS OK CLICKED');
        this.setState(
            {
                okDialogHeaderText: 'Ratings',
                okDialogBodyText: 'Rating successfully recorded',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
    }

    jobCancelledCallBack = () => {
        console.log('YES CLICKED');
        this.setState(
            {
                okDialogHeaderText: 'Job Cancellaton',
                okDialogBodyText: 'Job successfully cancelled',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
    }

    jobNotCancelledCallBack = () => {
        console.log('NO CLICKED');
        this.setState(
            {
                okDialogHeaderText: 'Job Cancellaton',
                okDialogBodyText: 'Job remains open',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
    }

    okDialogCallBack = () => {
        console.log('OK on OkDialog CLICKED');
        this.setState(
            {
                okDialogOpen: false
            });
    }
}