import * as React from "react";
import * as ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';
import {
    Nav,
    Navbar,
    NavItem,
    NavDropdown,
    MenuItem,
    Button} from "react-bootstrap";

import { Router, Route, hashHistory  } from 'react-router'

import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { CreateJob } from "./CreateJob";
import { ViewJob } from "./ViewJob";
import { ViewRating } from "./ViewRating";


export interface MainNavState {
    isLoggedIn: boolean;
}


class MainNav extends React.Component<undefined, MainNavState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isLoggedIn: true
        };
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
                    <MainNav/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


ReactDOM.render((
    <Router history={hashHistory}>
        <Route component={App}>
            <Route path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/createjob" component={CreateJob}/>
            <Route path="/viewjob" component={ViewJob}/>
            <Route path="/viewrating" component={ViewRating}/>
        </Route>
    </Router>
), document.getElementById('root'));


