import * as React from "react";
import * as ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';
import
{
    Well,
    Grid,
    Row,
    Col,
    Label
} from "react-bootstrap";


export class ViewRating extends React.Component<undefined, undefined> {
    render() {
        return (
            <Well className="outer-well">
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={6} md={6}>
                                <div>
                                    <h4>YOUR RANKING <Label>4.2</Label></h4>
                                </div>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={10} md={6}>
                                <h6>The finer details of your ranking are shown below</h6>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={10} md={6}>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-condensed factTable">
                                        <thead>
                                            <tr>
                                                <th>Ranked By</th>
                                                <th>Rank Given</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>John Doe</td>
                                                <td>4.2</td>
                                            </tr>
                                            <tr>
                                                <td>Mary Moe</td>
                                                <td>4.7</td>
                                            </tr>
                                            <tr>
                                                <td>July Dooley</td>
                                                <td>4.5</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
            </Well>
        )
    }
    }


