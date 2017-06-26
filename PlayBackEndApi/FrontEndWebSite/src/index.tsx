import * as React from "react";
import * as ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Button} from "react-bootstrap";

import { Router, Route, hashHistory  } from 'react-router'

import { Login } from "./Login";
import { Register } from "./Register";
import { CreateJob } from "./CreateJob";
import { ViewJob } from "./ViewJob";
import { ViewRating } from "./ViewRating";


class MainNav extends React.Component<undefined, undefined> {
    render() {
        return (
            <Navbar>
                <Nav>
                    <NavItem eventKey={1} href='#/'>Login</NavItem>
                    <NavItem eventKey={2} href='#/register'>Register</NavItem>
                    <NavItem eventKey={2} href='#/createjob'>Create Job</NavItem>
                    <NavItem eventKey={2} href='#/viewjob'>View Job</NavItem>
                    <NavItem eventKey={2} href='#/viewrating'>View Rating</NavItem>
                </Nav>
            </Navbar>
        )
    }
}



class App extends React.Component<undefined, undefined> {
    render() {
        return (

            <div>
                <MainNav/>
                {this.props.children}
            </div>
        )
    }
}


ReactDOM.render((
    <Router history={hashHistory}>
        <Route component={App}>
            <Route path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/createjob" component={CreateJob}/>
            <Route path="/viewjob" component={ViewJob}/>
            <Route path="/viewrating" component={ViewRating}/>
        </Route>
    </Router>
), document.getElementById('root'));


