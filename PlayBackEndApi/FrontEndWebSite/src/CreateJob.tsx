import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import Measure from 'react-measure'
import { OkDialog } from "./components/OkDialog";
import 'bootstrap/dist/css/bootstrap.css';
import {
    Well,
    Grid,
    Row,
    Col,
    ButtonInput,
    ButtonGroup,
    Button
} from "react-bootstrap";
import { AuthService } from "./services/AuthService";
import { JobService } from "./services/JobService";
import { PositionService } from "./services/PositionService";
import { Position } from "./domain/Position";
import { hashHistory } from 'react-router';
import { withGoogleMap, GoogleMap, Marker, InfoBox, OverlayView } from "react-google-maps";

const STYLES = {
    overlayView: {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 15,
    },
    icon: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20
    }
}


const GetPixelPositionOffset = (width, height) => {
    return { x: -(width / 2), y: -(height / 2) };
}

const CreateJobGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={16}
        defaultCenter={{ lat: 50.8202949, lng: -0.1406958 }}
        onClick={props.onMapClick}>

        <OverlayView
            key='createJobKey'
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            position={props.currentPosition}
            getPixelPositionOffset={GetPixelPositionOffset}>
            <div style={STYLES.overlayView}>
                <img style={STYLES.icon}
                    src='/assets/images/passenger.png' />
                <br />
                <Button
                    type='button'
                    bsSize='xsmall'
                    bsStyle='primary'
                    onClick={() => props.onCreateJobClick()}
                    disabled={props.hasIssuedJob}
                    value='Create Job'>Create Job</Button>
            </div>
        </OverlayView>
    </GoogleMap>
));


export interface CreateJobState {
    currentPosition: Position;
    dimensions: {
        width: number,
        height: number
    };
    hasIssuedJob: boolean;
    okDialogOpen: boolean;
    okDialogKey: number;
    okDialogHeaderText: string;
    okDialogBodyText: string;
    wasSuccessful: boolean;
}

export class CreateJob extends React.Component<undefined, CreateJobState> {

    private _authService: AuthService;
    private _jobService: JobService;
    private _positionService: PositionService;

    constructor(props: any) {
        super(props);
        this._jobService = props.route.jobService;
        this._authService = props.route.authService;
        this._positionService = props.route.positionService;
        console.log(this._authService.userName());
        console.log(this._authService.userEmail());
        console.log("CreateJob ctor");
        console.log(this._jobService);

        if (!this._authService.isAuthenticated()) {
            hashHistory.push('/');
        }

        if (this._authService.isDriver()) {
            hashHistory.push('/viewjob');
        }

        this.state = {
            currentPosition: new Position(50.8202949, -0.1406958),
            dimensions: { width: -1, height: -1 },
            hasIssuedJob: this._jobService.hasIssuedJob(),
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            wasSuccessful: false
        };
    }

    render() {

        const adjustedwidth = this.state.dimensions.width;

        return (
            <Well className="outer-well">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <h4>SET YOUR CURRENT LOCATION</h4>
                            <h6>Click the map to set your current location</h6>
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
                                        <CreateJobGoogleMap
                                            containerElement={
                                                <div style={{
                                                    position: 'relative',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',
                                                    width: { adjustedwidth },
                                                    height: 600,
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
                                            onMapLoad={this._handleMapLoad}
                                            onMapClick={this._handleMapClick}
                                            currentPosition={this.state.currentPosition}
                                            onCreateJobClick={this._handleCreateJobClick}
                                            hasIssuedJob={this.state.hasIssuedJob}
                                        />
                                    </div>
                                }
                            </Measure>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <span>
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

    _handleCreateJobClick = () => {


        var self = this;
        var currentUser = this._authService.user();

        var newJob = {

            clientFullName: currentUser.fullName,
            clientEmail: currentUser.email,
            driverFullName: '',
            driverEmail: '',
            vehicleDescription: '',
            vehicleRegistrationNumber: '',
            isAssigned: false,
            isCompleted: false

        }

        $.ajax({
            type: 'POST',
            url: 'job/submit',
            data: JSON.stringify(newJob),
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
        })
        .done(function (jdata, textStatus, jqXHR) {

            self._jobService.storeUserIssuedJob(newJob);
            const newState = Object.assign({}, self.state, {
                hasIssuedJob: self._jobService.hasIssuedJob()
            });
            //self.setState(newState)
            self._positionService.storeUserPosition(currentUser, self.state.currentPosition);
            hashHistory.push('/viewjob');
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            const newState = Object.assign({}, self.state, {
                okDialogHeaderText: 'Error',
                okDialogBodyText: jqXHR.responseText,
                okDialogOpen: true,
                okDialogKey: Math.random()
            })
            self.setState(newState)
        });
    }

    _okDialogCallBack = () => {
        this.setState(
            {
                okDialogOpen: false
            });
    }

    _handleMapLoad = (map) => {
        if (map) {
            console.log(map.getZoom());
        }
    }

    _handleMapClick = (event) => {
        const newState = Object.assign({}, this.state, {
            currentPosition: new Position(event.latLng.lat(), event.latLng.lng())
        })
        this.setState(newState)
    }
}