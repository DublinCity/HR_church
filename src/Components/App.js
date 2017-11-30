import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import PropTypes from 'prop-types';

import Register from './register'
import Lookup from './lookup'
import Birthday from './birthday'
// import Attendance from './Attendence'
import { 
	Button,
	Navbar,
	Nav,
	NavItem,

 } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const propTypes = {

};

const defaultProps = {

};

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      	<Router>
      		<div>
      			<Navbar>
              <Navbar.Header>
        				<Navbar.Brand>
        					<Link to="/">Jayang Church</Link>
        				</Navbar.Brand>
              </Navbar.Header>
      				<Nav>
								<LinkContainer to="/register"><NavItem>새신자 등록</NavItem></LinkContainer>
		      			<LinkContainer to="/lookup"><NavItem>재적 조회</NavItem></LinkContainer>
		      			<LinkContainer to="/birthday"><NavItem>생일자</NavItem></LinkContainer>
		      			<LinkContainer to="/attendance"><NavItem>출석부</NavItem></LinkContainer>
      				</Nav>
    			  </Navbar>
	      		<Route path="/register" component={Register}/>
	      		<Route path="/lookup" component={Lookup}/>
      			<Route path="/birthday" component={Birthday}/>
      		</div>
      	</Router>
    );
  }
};

const About = () => (
	<div>
		<h2>About</h2>
	</div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;