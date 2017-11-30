import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import {
	Grid,
	Row,
	Col,
	Button,
	ButtonToolbar,
	Tooltip,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types';

import Search from './Search'
const propTypes = {

};

const defaultProps = {

};


class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
    	<Router>
	      <div>
					<Grid style={{margin: 1 +'rem'}}>	
						<Row className="show-grid" style={{listStyle: 'none', textAlign:'center'}}>
								
								<ButtonToolbar>
			      			<LinkContainer to="/lookup/sarangbang"><Button bsStyle="warning">사랑방 기준</Button></LinkContainer>
			      			<LinkContainer to="/lookup/peer"><Button bsStyle="danger">또래 기준</Button></LinkContainer>
		      				
		      			</ButtonToolbar>
	      		</Row>
	      	</Grid>
	      	<Route path={`/lookup/:standard`} component={Search}/>
	      	<Route exact path={`/lookup`} component={Search}/>
	      </div>
      </Router>
    );
  }
}

index.propTypes = propTypes;
index.defaultProps = defaultProps;

export default index;