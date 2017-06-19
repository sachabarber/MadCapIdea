//import * as React from "react";
//import * as ReactDOM from "react-dom";
//import * as _ from "lodash";

//import 'bootstrap/dist/css/bootstrap.css';
//import
//{
//    Well,
//    Grid,
//    Row,
//    Col,
//    ButtonInput,
//    ButtonGroup,
//    Button
//} from "react-bootstrap";

//import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

//const GettingStartedGoogleMap = withGoogleMap(props => (
//    <GoogleMap
//        ref={props.onMapLoad}
//        defaultZoom={16}
//        defaultCenter={{ lat: 50.8202949, lng: -0.1406958 }}
//        onClick={props.onMapClick}
//        >
//        {props.markers.map(marker => (
//            <Marker
//                {...marker}
//                onRightClick={() => props.onMarkerRightClick(marker) }
//                />
//        )) }
//    </GoogleMap>
//));





////TODO : make this correct
////see https://tomchentw.github.io/react-google-maps/
////
////state = {
////    markers: [{
////      position: {
////        lat: 25.0112183,
////        lng: 121.52067570000001,
////      },
////      key: `Taiwan`,
////      defaultAnimation: 2,
////    }],
////  };

//export interface CreateJobState {
//    markers: any;
//}

//export class CreateJob extends React.Component<undefined, CreateJobState> {

//    constructor(props: any) {
//        super(props);
//        this.state = {
//            markers: []
//          };
//    }


//    render() {
//        return (
//            <Well className="outer-well">
//                <Grid>
//                    <Row className="show-grid">
//                        <Col xs={10} md={6}>
//                            <h4>SET YOUR CURRENT LOCATION</h4>
//                            <h6>Click the map to set your current location</h6>
//                        </Col>
//                    </Row>
//                    <Row className="show-grid">
//                        <Col xs={10} md={6}>
//                            <GettingStartedGoogleMap
//                                containerElement={
//                                    <div style={{
//                                        position: 'relative',
//                                        top: 0,
//                                        left: 0,
//                                        right: 0,
//                                        bottom: 0,
//                                        width: 600,
//                                        height: 600,
//                                        justifyContent: 'flex-end',
//                                        alignItems: 'center',
//                                        marginTop: 20,
//                                        marginLeft: 0,
//                                        marginRight: 0,
//                                        marginBottom: 20
//                                    }} />
//                                }
//                                mapElement={
//                                    <div style={{
//                                        position: 'relative',
//                                        top: 0,
//                                        left: 0,
//                                        right: 0,
//                                        bottom: 0,
//                                        width: 600,
//                                        height: 600,
//                                        marginTop: 20,
//                                        marginLeft: 0,
//                                        marginRight: 0,
//                                        marginBottom: 20
//                                    }} />
//                                }
//                                onMapLoad={this._handleMapLoad}
//                                onMapClick={this._handleMapClick}
//                                markers={this.state.markers}
//                                onMarkerRightClick={this._handleMarkerRightClick}
//                                />
//                        </Col>
//                    </Row>
//                    <Row className="show-grid">
//                        <ButtonInput
//                            id="createJobBtn"
//                            type='submit'
//                            bsSize='small'
//                            bsStyle='primary'
//                            value='Register'>Create Job</ButtonInput>
//                    </Row>
//                </Grid>
//            </Well>
//        );
//    }

//    _handleMapLoad = (map) => {
//        //this._mapComponent = map;
//        if (map) {
//            console.log(map.getZoom());
//        }
//    }

//    _handleMapClick = (event) => {
//        const nextMarkers = [
//            {
//                position: event.latLng,
//                defaultAnimation: 2,
//                key: Date.now(),
//            },
//        ];
//        this.setState({
//            markers: nextMarkers,
//        });
//    }
//}
