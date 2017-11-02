import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {
    Nav,
    Navbar,
    NavItem,
    NavDropdown,
    MenuItem,
    Button
} from "react-bootstrap";
import { Router, Route, hashHistory } from 'react-router'
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { CreateJob } from "./CreateJob";
import { ViewJob } from "./ViewJob";
import { ViewRating } from "./ViewRating";
import { ContainerOperations } from "./ioc/ContainerOperations";
import { AuthService } from "./services/AuthService";
import { JobService } from "./services/JobService";
import { JobStreamService } from "./services/JobStreamService";
import { PositionService } from "./services/PositionService";
import { TYPES } from "./types";
import Rx from 'rx';

let authService = ContainerOperations.getInstance().container.get<AuthService>(TYPES.AuthService);
let jobService = ContainerOperations.getInstance().container.get<JobService>(TYPES.JobService);
let jobStreamService = ContainerOperations.getInstance().container.get<JobStreamService>(TYPES.JobStreamService);
let positionService = ContainerOperations.getInstance().container.get<PositionService>(TYPES.PositionService);
jobStreamService.init();


export interface MainNavProps {
    authService: AuthService;
    jobService: JobService;
    jobStreamService: JobStreamService;
    positionService: PositionService;

}

export interface MainNavState {
    isLoggedIn: boolean;
}

class MainNav extends React.Component<MainNavProps, MainNavState> {

    private _subscription: any;

    constructor(props: any) {
        super(props);
        console.log(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentWillMount() {
        this._subscription = this.props.authService.getAuthenticationStream()
            .subscribe(isAuthenticated => {
                this.state = {
                    isLoggedIn: isAuthenticated
                };
                if (this.state.isLoggedIn) {
                    hashHistory.push('/createjob');
                }
                else {
                    hashHistory.push('/');
                }
            });
    }

    componentWillUnmount() {
        this._subscription.dispose();
    }

    render() {
        return (
            this.state.isLoggedIn ?
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <span>Simple Kafka-Uber</span>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={2} href='#/logout'>Logout</NavItem>
                            <NavItem eventKey={2} href='#/createjob'>Create Job</NavItem>
                            <NavItem eventKey={2} href='#/viewjob'>View Job</NavItem>
                            <NavItem eventKey={2} href='#/viewrating'>View Rating</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar> :
                <Navbar pullRight collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <span>Simple Kafka-Uber</span>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}

class App extends React.Component<undefined, undefined> {
    render() {
        return (
            <div>
                <div>
                    <MainNav
                        authService={authService}
                        jobService={jobService}
                        jobStreamService={jobStreamService}
                        positionService={positionService}
                    />
                    {this.props.children}
                </div>
            </div>
        )
    }
}


ReactDOM.render((
    <Router history={hashHistory}>
        <Route component={App}>
            <Route
                path="/"
                component={Login}
                authService={authService} />
            <Route
                path="/register"
                component={Register}
                authService={authService} />
            <Route
                path="/logout"
                component={Logout}
                authService={authService}
                jobService={jobService}
                positionService={positionService} />
            <Route
                path="/createjob"
                component={CreateJob}
                authService={authService}
                jobService={jobService}
                positionService={positionService} />
            <Route
                path="/viewjob"
                component={ViewJob}
                authService={authService}
                jobService={jobService}
                jobStreamService={jobStreamService}
                positionService={positionService} />
            <Route
                path="/viewrating"
                component={ViewRating}
                authService={authService} />
        </Route>
    </Router>
), document.getElementById('root'));

