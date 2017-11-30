import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase'
import {
	Grid,
	Col,
	Image,
	Row,
  Table,
  Panel,
} from 'react-bootstrap';

const database = firebase.database();
const starCountRef = firebase.database().ref(`group`);

const propTypes = {

};

const defaultProps = {

};



class index extends Component {

  constructor(props) {
    super(props);
    this.state ={
    	people: [],
      stringFirstDay: "",
      stringLastDay: "",
    }
  }
	componentDidMount() {
  	starCountRef.on('value', snapshot => {
      let array = []
      Object.values(snapshot.val()).forEach(object=>{
        array.push(...Object.values(object))
      })

      console.log(array)
      
      let curr1 = new Date();
      let curr2 = new Date();
      let firstday = curr1.getDate() - curr1.getDay();
      let thisWeekFirstDay =new Date(curr2.setDate(firstday));
      let thisWeekLastDay = new Date(curr1.setDate(firstday+6));
      let stringFirstDay = ""
      let stringLastDay = ""
      stringFirstDay += String("0" + Number(thisWeekFirstDay.getMonth()+1)).slice(-2)
      stringFirstDay += String("0" + thisWeekFirstDay.getDate()).slice(-2)
      stringLastDay += String("0" + Number(thisWeekLastDay.getMonth()+1)).slice(-2)
      stringLastDay += String("0" + thisWeekLastDay.getDate()).slice(-2)
      this.setState({
        stringFirstDay: stringFirstDay,
        stringLastDay: stringLastDay,
      })
      array = array.filter(person => {
        if(String(person.birth).slice(-4) >= stringFirstDay && String(person.birth).slice(-4) <= stringLastDay) {
          return true;
        }
        else {
          return false;
        }
      })
      console.log(stringFirstDay,stringLastDay,array)
      this.setState({
        people: array
      })
  	});
  }
  render() {
    const mapToPeople = (people) => { return (
      <Table responsive>
        <thead>
          <tr>
            <th>또래</th>
            <th>이름</th>
            <th>생일</th>
          </tr>
        </thead>
        <tbody>
        {people.map((person,i) => (
          <tr key={i}>
            <td>{person.peer}</td>
            <td>{person.name}</td> 
            <td>{person.birth}</td>
          </tr>))}
        </tbody>
      </Table>
      )};
    const title = (
      <h3>
        {this.state.stringFirstDay} ~ {this.state.stringLastDay} 생일자
      </h3>)
    return (
      <div>
        <Grid>
        <Panel header={title} bsStyle="primary">

       	 {mapToPeople(this.state.people)}
        </Panel>
        </Grid>
      </div>
    );
  }

}

index.propTypes = propTypes;
index.defaultProps = defaultProps;

export default index;