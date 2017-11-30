import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

import PropTypes from 'prop-types';

import RegisterModal from './RegisterModal'

import firebase  from 'firebase';

var config = {
      apiKey: "AIzaSyCszxCkzz0aWFt2qwA_xI7KD3HS6phAdyI",
      authDomain: "jayang-da2b8.firebaseapp.com",
      databaseURL: "https://jayang-da2b8.firebaseio.com",
      projectId: "jayang-da2b8",
      storageBucket: "jayang-da2b8.appspot.com",
      messagingSenderId: "657190238435"
    };
    firebase.initializeApp(config);
const database = firebase.database();

const propTypes = {

};

const defaultProps = {

};

class index extends Component {

  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleCreate(name,birthday) {
  	let newPostRef = database.ref(`group/${birthday.slice(2,4)}`).push();
  	console.log(birthday.slice(2,4))
		newPostRef.set({
		    name: name,
		    birthday: birthday,
		    peer: Number(birthday.slice(2,4)),
		});
  }
  render() {
  	// const registModal = (

  	// 	)
    return (
    	<div style={{textAlign: 'center'}}>
    		<h3>안녕하세요! 반갑습니다</h3>
    		<hr/>
	      <RegisterModal onCreate={this.handleCreate}/>
      	<hr/>
      </div>
    );
  }
}

index.propTypes = propTypes;
index.defaultProps = defaultProps;

export default index;