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
import { JobService } from "./services/JobService";
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
    isJobAccepted: boolean
}

type DoneCallback = (jdata: any, textStatus: any, jqXHR: any) => void


export class ViewJob extends React.Component<undefined, ViewJobState> {

    private _authService: AuthService;
    private _jobService: JobService;
    private _jobStreamService: JobStreamService;
    private _positionService: PositionService;
    private _subscription: any; 
    private _currentJobUUID: any;

    constructor(props: any) {
        super(props);
        this._authService = props.route.authService;
        this._jobStreamService = props.route.jobStreamService;
        this._jobService = props.route.jobService;
        this._positionService = props.route.positionService;
        
        if (!this._authService.isAuthenticated()) {
            hashHistory.push('/');
        }

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
                this._positionService.currentPosition(this._authService.userEmail()),
            isJobAccepted:false
        };
    }

    componentWillMount() {
        var self = this;
        this._subscription =
            this._jobStreamService.getJobStream()
            .retry()
            .where(function (x, idx, obs) {
                return self.shouldShowMarkerForJob(x.detail);
            })
            .subscribe(
                jobArgs => {

                    console.log('RX saw onJobChanged');
                    console.log('RX x = ', jobArgs.detail);

                    this._jobService.clearUserIssuedJob();
                    this._jobService.storeUserIssuedJob(jobArgs.detail);
                    this.addMarkerForJob(jobArgs.detail);
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

                    {this.state.isJobAccepted === true ?
                        <Row className="show-grid">
                            <span>
                                <RatingDialog
                                    theId="viewJobCompleteBtn"
                                    headerText="Rate your driver/passenger"
                                    okCallBack={this.ratingsDialogOkCallBack} />

                                {!(this._authService.isDriver() === true) ?

                                    <YesNoDialog
                                        theId="viewJobCancelBtn"
                                        launchButtonText="Cancel"
                                        yesCallBack={this.jobCancelledCallBack}
                                        noCallBack={this.jobNotCancelledCallBack}
                                        headerText="Cancel the job" />
                                    : 
                                    null
                                }

                                <OkDialog
                                    open={this.state.okDialogOpen}
                                    okCallBack={this.okDialogCallBack}
                                    headerText={this.state.okDialogHeaderText}
                                    bodyText={this.state.okDialogBodyText}
                                    key={this.state.okDialogKey} />
                            </span>
                        </Row> :
                        null
                    }
                </Grid>
            </Well>
        );
    }

    handleMarkerClick = (targetMarker) => {

        //TODO :This should update the current job with "IsAccepted" and push it out
        //TODO :This should update the current job with "IsAccepted" and push it out
        //TODO :This should update the current job with "IsAccepted" and push it out
        //TODO :This should update the current job with "IsAccepted" and push it out
        //TODO :This should update the current job with "IsAccepted" and push it out
        //TODO :This should update the current job with "IsAccepted" and push it out


        const newState = Object.assign({}, this.state, {
            isJobAccepted: true
        })
        this.setState(newState);


        console.log('button on overlay clicked:' + targetMarker.key);
    }

    handleMapClick = (event) => {

        let currentUser = this._authService.user();
        let isDriver = this._authService.isDriver();
        let matchedMarker = _.find(this.state.markers, { 'email': currentUser.email });

        this._positionService.clearUserPosition(this._authService.userEmail());
        this._positionService.storeUserPosition(
            currentUser,
            new Position(event.latLng.lat(), event.latLng.lng()));

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
        this._positionService.storeUserJobPositions(currentUser, this.state.markers);
        this.pushOutJob();
    }


    pushOutJob = (): void => {

        var self = this;
        let currentUser = this._authService.user();
        let isDriver = this._authService.isDriver();
        let hasIssuedJob = this._jobService.hasIssuedJob();
        let currentJob = this._jobService.currentJob();
        let currentPosition = this._positionService.currentPosition(currentUser.email);

        var localClientFullName = '';
        var localClientEmail = '';
        var localClientPosition = null;
        var localDriverFullName = '';
        var localDriverEmail = '';
        var localDriverPosition = null;
        var localIsAssigned = false;

        if (hasIssuedJob) {
            if (currentJob.isAssigned != undefined && currentJob.isAssigned != null) {
                localIsAssigned = currentJob.isAssigned;
            }
            else {
                localIsAssigned = false;
            }
        }

        //clientFullName
        if (hasIssuedJob) {
            if (currentJob.clientFullName != undefined && currentJob.clientFullName != "") {
                localClientFullName = currentJob.clientFullName;
            }
            else {
                localClientFullName = !isDriver ? currentUser.fullName : '';
            }
        }
        //clientEmail
        if (hasIssuedJob) {
            if (currentJob.clientEmail != undefined && currentJob.clientEmail != "") {
                localClientEmail = currentJob.clientEmail;
            }
            else {
                localClientEmail = !isDriver ? currentUser.email : '';
            }
        }
        //clientPosition
        if (hasIssuedJob) {
            if (currentJob.clientPosition != undefined && currentJob.clientPosition != null) {
                localClientPosition = currentJob.clientPosition;
            }
            else {
                localClientPosition = !isDriver ? currentPosition : null;
            }
        }

        if (hasIssuedJob) {
            //driverFullName
            if (currentJob.driverFullName != undefined && currentJob.driverFullName != "") {
                localDriverFullName = currentJob.driverFullName;
            }
            else {
                localDriverFullName = isDriver ? currentUser.fullName : '';
            }
            //driverEmail
            if (currentJob.driverEmail != undefined && currentJob.driverEmail != "") {
                localDriverEmail = currentJob.driverEmail;
            }
            else {
                localDriverEmail = isDriver ? currentUser.email : '';
            }
            //driverPosition
            if (currentJob.driverPosition != undefined && currentJob.driverPosition != null) {
                localDriverPosition = currentJob.driverPosition;
            }
            else {
                localDriverPosition = isDriver ? currentPosition : null;
            }
        }
        else {
            localDriverFullName = currentUser.fullName;
            localDriverEmail = currentUser.email;
            localDriverPosition = isDriver ? currentPosition : null;
        }

        var newJob = {
            jobUUID: this._currentJobUUID != undefined && this._currentJobUUID != '' ?
                this._currentJobUUID : '',
            clientFullName: localClientFullName,
            clientEmail: localClientEmail,
            clientPosition: localClientPosition,
            driverFullName: localDriverFullName,
            driverEmail: localDriverEmail,
            driverPosition: localDriverPosition,
            vehicleDescription: isDriver ?
                this._authService.user().vehicleDescription : '',
            vehicleRegistrationNumber: isDriver ?
                this._authService.user().vehicleRegistrationNumber : '',
            isAssigned: localIsAssigned,
            isCompleted: false
        }

        this.makePOSTRequest('job/submit', newJob, self,
            function (jdata, textStatus, jqXHR) {
                self._jobService.clearUserIssuedJob();
                self._jobService.storeUserIssuedJob(newJob);
            });
    }

    createMarker = (
        fullname: string,
        email: string,
        isDriver: boolean,
        event: any): PositionMarker => {

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

        if (jobArgs.jobUUID != undefined && jobArgs.jobUUID != '')
            this._currentJobUUID = jobArgs.jobUUID;


        //TODO : should see if the client/driver for the job is in the list if it is remove it
        //TODO : add it
        //TODO : Update the list of position markers in the PositionService
        //TODO : Should clear out the current stored job
        //TODO : Should store new job ( self._jobService.storeUserIssuedJob(newJob);)
    }

    shouldShowMarkerForJob = (jobArgs: any): boolean => {

        //TODO
        //1. If the current job client is the current client logged in
        //2. If the current job driver is the current driver logged in
        //3. If the job isAssigned and its for the current logged in client/driver
        //4. Or if the job is unassigned and if there is no other active job for this client/driver
        return true;
    }

    ratingsDialogOkCallBack = (theRatingScore: number) => {
        console.log('RATINGS OK CLICKED');

        var self = this;
        let currentUser = this._authService.user();
        let isDriver = this._authService.isDriver();
        let currentJob = this._jobService.currentJob();

        var ratingJSON = null;

        if (!isDriver) {
            ratingJSON = {
                fromEmail: this._authService.userEmail(),
                toEmail: currentJob.driverEmail,
                score: theRatingScore
            }
        }
        else {
            ratingJSON = {
                fromEmail: this._authService.userEmail(),
                toEmail: currentJob.clientEmail,
                score: theRatingScore
            }
        }

        this.makePOSTRequest('rating/submit/new', ratingJSON, self,
            function (jdata, textStatus, jqXHR) {
                this._jobService.clearUserIssuedJob();
                this._positionService.clearUserJobPositions(this._authService.userEmail());
                this.setState(
                    {
                        okDialogHeaderText: 'Ratings',
                        okDialogBodyText: 'Rating successfully recorded',
                        okDialogOpen: true,
                        okDialogKey: Math.random()
                    });
            });
    }

   
    makePOSTRequest = (route: string, jsonData: any, context: ViewJob, doneCallback: DoneCallback) => {

        $.ajax({
            type: 'POST',
            url: route,
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
        })
        .done(function (jdata, textStatus, jqXHR) {
            doneCallback(jdata, textStatus, jqXHR);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            const newState = Object.assign({}, context.state, {
                okDialogHeaderText: 'Error',
                okDialogBodyText: jqXHR.responseText,
                okDialogOpen: true,
                okDialogKey: Math.random()
            })
            context.setState(newState)
        });


    }

    jobCancelledCallBack = () => {
        console.log('CANCEL YES CLICKED');
        this._jobService.clearUserIssuedJob();
        this._positionService.clearUserJobPositions(this._authService.userEmail());
        this.setState(
            {
                okDialogHeaderText: 'Job Cancellaton',
                okDialogBodyText: 'Job successfully cancelled',
                okDialogOpen: true,
                okDialogKey: Math.random()
            });
    }

    jobNotCancelledCallBack = () => {
        console.log('CANCEL NO CLICKED');
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