import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import { OkDialog } from "./components/OkDialog";
import 'bootstrap/dist/css/bootstrap.css';
import
{
    Well,
    Grid,
    Row,
    Col,
    Label,
    ButtonInput
} from "react-bootstrap";

import { AuthService } from "./services/AuthService";

import { hashHistory  } from 'react-router';



class Rating {
    fromEmail: string
    toEmail: string
    score: number

    constructor(fromEmail, toEmail, score) {
        this.fromEmail = fromEmail;
        this.toEmail = toEmail;
        this.score = score;
    }
}


export interface ViewRatingState {
    ratings: Array<Rating>;
    overallRating: number;
    okDialogOpen: boolean;
    okDialogKey: number;
    okDialogHeaderText: string;
    okDialogBodyText: string;
    wasSuccessful: boolean;
}


export class ViewRating extends React.Component<undefined, ViewRatingState> {

    private _authService: AuthService;

    constructor(props: any) {
        super(props);
        this._authService = props.route.authService;
        if (!this._authService.isAuthenticated()) {
            hashHistory.push('/');
        }
        this.state = {
            overallRating: 0,
            ratings: Array(),
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0,
            wasSuccessful: false
        };
    }   


    loadRatingsFromServer = () => {

        var self = this;
        var currentUserEmail = this._authService.userEmail();

        $.ajax({
            type: 'GET',
            url: 'rating/byemail?email=' + currentUserEmail,
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
        })
        .done(function (jdata, textStatus, jqXHR) {

            console.log("result of GET rating/byemail");
            console.log(jqXHR.responseText);
            let ratingsObtained = JSON.parse(jqXHR.responseText);
            self.setState(
                {
                    overallRating: _.sumBy(ratingsObtained, 'score'),
                    ratings: ratingsObtained
                });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            self.setState(
                {
                    okDialogHeaderText: 'Error',
                    okDialogBodyText: 'Could not load Ratings',
                    okDialogOpen: true,
                    okDialogKey: Math.random()
                });
        });
        
    }

    componentDidMount() {
        this.loadRatingsFromServer();
    }

    render() {

        var rowComponents = this.generateRows();

        return (
            <Well className="outer-well">
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={6} md={6}>
                                <div>
                                <h4>YOUR OVERALL RATING <Label>{this.state.overallRating}</Label></h4>
                                </div>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={10} md={6}>
                                <h6>The finer details of your ratings are shown below</h6>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={10} md={6}>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-condensed factTable">
                                        <thead>
                                            <tr>
                                                <th>Rated By</th>
                                                <th>Rating Given</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rowComponents} 
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <span>
                                <OkDialog
                                    open= {this.state.okDialogOpen}
                                    okCallBack= {this._okDialogCallBack}
                                    headerText={this.state.okDialogHeaderText}
                                    bodyText={this.state.okDialogBodyText}
                                    key={this.state.okDialogKey}/>
                            </span>
                        </Row>
                    </Grid>
            </Well>
        )
    }

    _okDialogCallBack = () => {
        this.setState(
            {
                okDialogOpen: false
            });
    }

    generateRows = () => {
        return this.state.ratings.map(function (item) {
            return  <tr key={item.fromEmail}>
                        <td>{item.fromEmail}</td>
                        <td>{item.score}</td>
                    </tr>;

        });
    } 
}