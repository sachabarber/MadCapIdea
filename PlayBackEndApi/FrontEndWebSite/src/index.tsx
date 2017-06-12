import * as React from "react";
import * as ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from "react-bootstrap";

import { Router, Route, hashHistory  } from 'react-router'


class MainNav extends React.Component<undefined, undefined> {
  render() {
    return (
     <Navbar brand='React-Bootstrap'>
         <Nav>
             <NavItem eventKey={1} href='#/'>Home</NavItem>
             <NavItem eventKey={2} href='#/contact'>Contact</NavItem>
             <NavItem eventKey={2} href='#/about'>About</NavItem>
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
        hashHistory.push('/contact');
    };

    render() {
        return (
             <button onClick={this.handleClick} type="button">go to contact</button>

        )
    }
}



const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Contact = () => (
  <div>
    <h2>Contact</h2>
  </div>
)


const About = () => (
  <div>
    <h2>About</h2>
  </div>
)



ReactDOM.render((
    <Router history={hashHistory}>
            <Route component={App}>
                <Route path="/" component={Home}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/about" component={About}/>
                <Route path="/redirecter" component={ReDirecter}/>
            </Route>
        </Router>
), document.getElementById('root'));





//ReactDOM.render(
//    <MainNav/>,
//    document.getElementById('root')
//);


