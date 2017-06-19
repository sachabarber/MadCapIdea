import * as React from "react";
import * as ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Button} from "react-bootstrap";

import { Router, Route, hashHistory  } from 'react-router'

import { Login } from "./Login";
import { Register } from "./Register";
import { CreateJob } from "./CreateJob";

class MainNav extends React.Component<undefined, undefined> {
    render() {
        return (
            <Navbar>
                <Nav>
                    <NavItem eventKey={1} href='#/'>Login</NavItem>
                    <NavItem eventKey={2} href='#/register'>Register</NavItem>
                    <NavItem eventKey={2} href='#/createjob'>CreateJob</NavItem>
                    <NavItem eventKey={2} href='#/redirecter'>Redirect</NavItem>
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


class ReDirecter extends React.Component<undefined, undefined> {

    handleClick = () => {
        hashHistory.push('/');
    };

    render() {
        return (
            <Button bsStyle="primary" bsSize="large" onClick={this.handleClick}>Go to Login</Button>
        )
    }
}




const About = () => (
    <div>
        <h2>About</h2>
    </div>
)



ReactDOM.render((
    <Router history={hashHistory}>
        <Route component={App}>
            <Route path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/createjob" component={CreateJob}/>
            <Route path="/redirecter" component={ReDirecter}/>
        </Route>
    </Router>
), document.getElementById('root'));


