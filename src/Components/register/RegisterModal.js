import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	Modal,
	Button,
	Form,
	FormGroup,
	Col,
	FormControl,
	Checkbox,
	ControlLabel,
	Radio,
} from 'react-bootstrap'

const propTypes = {

};

const defaultProps = {

};

class RegisterModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	showModal: false,
    	name:"",
    	phone:"",
    	birthday:"",
    	peer: ""
    }
    this.open = this.open.bind(this)
    this.close =this.close.bind(this)
    this.handleChange = this.handleChange.bind(this)
  	this.handleCreate = this.handleCreate.bind(this)
  }

 	open() {
    this.setState({ showModal: true });
  }
	
	close() {
    this.setState({ showModal: false });
  }

  handleChange(e) {
  	let nextState ={}
  	nextState[e.target.name] = e.target.value
  	this.setState(nextState)
  }

  render() {
    return (
      <div>
      	<Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          새가족을 등록해주세요!
        </Button>
        <Modal show={this.state.showModal} >
          <Modal.Header>
            <Modal.Title >새가족을 등록합니다.</Modal.Title>
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
				        	onChange={this.handleChange} 
				        	type="text" name="name" 
				        	placeholder="홍길동이" />
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formHorizontalPassword">
				      <Col componentClass={ControlLabel} sm={2}>
				        생년월일을 알려주세요!
				      </Col>
				      <Col sm={10}>
				        <FormControl 
				        	value={this.state.birthday}
				        	type="number" 
				        	onChange={this.handleChange}
				        	name="birthday" 
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
          	<Button bsStyle="success" onClick={this.handleCreate}>등록하기!</Button>
            <Button bsStyle="danger" onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  handleCreate() {
  	if(this.state.birthday.length != 8) return 
  		console.log('create')
  	this.props.onCreate(
  		this.state.name,
  		this.state.birthday,
  		)
  	this.setState({ showModal: false });
  }
}

RegisterModal.propTypes = propTypes;
RegisterModal.defaultProps = defaultProps;

export default RegisterModal;