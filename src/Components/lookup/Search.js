import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	BrowserRouter as Router,
	Link,
	Route
} from 'react-router-dom';
import { 
	Table,
	ListGroup,
	ListGroupItem,
	Grid,
	Row,
	Col,
  Modal,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  Radio,
  FormControl,
  Tooltip,
 } from 'react-bootstrap'
import firebase  from 'firebase';

const database = firebase.database();
const starCountRef = firebase.database().ref(`group`);

const propTypes = {
};

const defaultProps = {
	standard: "peer",
};

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	standard: "peer",
    	people: [],
    	peers: [],
    	selectedPeer:"",
      ModalOpen: false,
      selectedPerson: 0,
      isEdit: false,
      name: "",
      birth: "",
    }
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
  	starCountRef.on('value', snapshot => {
			this.setState({
				peers: Object.keys(snapshot.val()),
			})
  	});
  }
  componentWillReceiveProps(nextProps){
  	this.setState({
  		standard: nextProps.match.params.standard,
  	})
  }
  handleClick(i) {
    this.setState({
      ModalOpen: !this.state.ModalOpen,
      selectedPerson: i,
      name:this.state.people[i].name,
      birth: this.state.people[i].birth,
      peer: this.state.selectedPeer,
    })

  }
  close() {
    this.setState({
      isEdit: !this.state.isEdit,
    })
  }
  onCreate() {
    firebase.database().ref(`group/${this.state.selectedPeer}/${this.state.selectedPerson}`).set({
      name:this.state.name,
      birth: this.state.birth,
      peer: this.state.selectedPeer,
    })
    this.setState({
      isEdit:false
    })
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
        {Object.entries(this.state.people).map(item=>{
          return (
            <tr key={item[0]}>
            <td>{item[1].peer}</td>
            <td onClick={()=>this.handleClick(item[0])}>{item[1].name}</td> 
            <td>{item[1].birth}</td>
          </tr>)
        })}
	  		</tbody>
  		</Table>
  		)};
		const mapToPeers = (peers) => {
			return (
				<ListGroup>
					{
						peers.map((peer,i) => {
							return (
									<ListGroupItem key={i} onClick={() => this.handleChange(peer)}>{peer}</ListGroupItem>
								)
						})
					}
				</ListGroup>
				)
		}
    const confirmModal = (
      <Modal show={this.state.ModalOpen} onHide={()=>{this.setState({
          ModalOpen: false,
        })}}>
          <Modal.Header>
            <Modal.Title>Modal Title </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            '{this.state.people[this.state.selectedPerson]? this.state.people[this.state.selectedPerson].name: '개발자'}' 님을 수정하시겠습니까?
          </Modal.Body>
          <Modal.Footer>
            <Button 
              bsStyle="success" 
              onClick={() => {
                this.setState({
                  ModalOpen: !this.state.ModalOpen,
                  isEdit: !this.state.isEdit,
                })
               }
              }>
              수정하기
            </Button>
            <Button 
              bsStyle="danger" 
              onClick={() =>
                this.setState({
                  ModalOpen: !this.state.ModalOpen
                })}>
                닫기
            </Button>
          </Modal.Footer>
        </Modal>
      )
    const editModal = (
        <Modal show={this.state.isEdit} >
          <Modal.Header>
            <Modal.Title >'{this.state.people[this.state.selectedPerson]? this.state.people[this.state.selectedPerson].name: '개발자'}' 님을 수정합니다.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form horizontal>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                이름이 어떻게 되세요?
              </Col>
              <Col sm={10}>
                <FormControl 
                  value={this.state.name} 
                  onChange={this.onChange} 
                  type="text" 
                  name="name" 
                  placeholder="홍길동이" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                생년월일을 알려주세요!
              </Col>
              <Col sm={10}>
                <FormControl 
                  value={this.state.birth}
                  type="number" 
                  onChange={this.onChange}
                  name="birth" 
                  placeholder="ex)19920826"
                   />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                청년 몇 부에 등록하시나요?
              </Col>
              <Col sm={10}>
                <Radio name="radioGroup">
                  쳥년 1 부 (20세~26세)
                </Radio>
              </Col>
              <Col sm={10}>
                <Radio name="radioGroup">
                  청년 2 부 (27세~32세)
                </Radio>
              </Col>  
              <Col sm={10}>
                <Radio name="radioGroup">
                  청년 3 부 (33세 ~ )
                </Radio>
              </Col>  
            </FormGroup>

          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.onCreate}>수정하기!</Button>
            <Button bsStyle="danger" onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    return (
    	<Router>
    		<div>
    		<Grid style={{margin: 0}}>
    		<Row className="show-grid">
    			<Col xs={2} md={2}>
            {this.state.ModalOpen? confirmModal : "" }
            {this.state.isEdit? editModal : "" }
    				{this.state.standard =="peer"? mapToPeers(this.state.peers) : ""}
    			</Col>
    			<Col xs={10} md={10}>
    				{mapToPeople(this.state.people)}
    			</Col>
    		</Row>
	      </Grid>
	      </div>
      </Router>
    );
  }

  handleChange(peer) {
  	this.setState({
  		selectedPeer: peer
  	})
  	this.getData(peer);
  }
  getData(peers) {
  	const starCountRef = firebase.database().ref(`group/${peers}`);
		starCountRef.on('value', snapshot => {
			this.setState({
				people: snapshot.val()
			})
		});
  }
  onChange(e){
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState);
  }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;