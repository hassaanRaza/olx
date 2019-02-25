import React, { Component } from 'react';
import {Input, Label, FormGroup, Button, Container, Row, Col} from 'reactstrap';
import {register} from '../config/Firebase';


export default class Register extends Component {
    constructor(){
        super();

        this.state = {
            email: '',
            password: ''
        }
        this.signUp = this.signUp.bind(this);
        this.showLogin = this.showLogin.bind(this);
    }
    signUp(){
        const {firstName, email, password, age} = this.state;
        const user = {firstName, email, password, age};
        register(user);
    }

    showLogin(){
      this.props.history.push('login');
    }

  render() {
    return (
      <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <h3>Register</h3>
        </div>
        <FormGroup>
            <Label>First Name:</Label>
            <Input onChange={(e)=>{this.setState({firstName:e.target.value})}} placeholder="Enter your first name.." />
        </FormGroup>
        <FormGroup>
            <Label>Email:</Label>
            <Input onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="Enter your email.." />
        </FormGroup>
        <FormGroup>
            <Label>Password:</Label>
            <Input type="password" onChange={(e)=>{this.setState({password:e.target.value})}} placeholder="Enter your password.." />
        </FormGroup>
        <FormGroup>
            <Label>Age:</Label>
            <Input type="number" onChange={(e)=>{this.setState({age:e.target.value})}} placeholder="Enter your age.." />
        </FormGroup>
        <FormGroup>
            <Button onClick={this.signUp} color="primary">Register</Button>
        </FormGroup>
        <FormGroup>
            {/* <Button onClick={this.props.showLogin}>Already registered? Login from here</Button> */}
            <Button onClick={this.showLogin}>Already registered? Login from here</Button>
        </FormGroup>
      </Container>
    )
  }
}
