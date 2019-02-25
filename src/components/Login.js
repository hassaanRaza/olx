import React, { Component } from 'react';
import { Input, Label, FormGroup, Button, Container, Row, Col } from 'reactstrap';
import { login, getUserId } from '../config/Firebase';
import {authInfo} from '../config/Routes';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    }
    this.signIn = this.signIn.bind(this);
    this.showRegister = this.showRegister.bind(this);
  }
  async signIn() {
    const { email, password } = this.state;
    const user = await login(email, password);
    //localStorage.setItem("currentUser", JSON.stringify(user))
    authInfo.login(user);
    this.props.history.push('/');
    //console.log('user from component..', JSON.stringify(user));
    this.props.currentUser(user);
    //this.props.user(user);
  }

  showRegister(){
    this.props.history.push('register');
  }

  render() {
    return (
      <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <h3>Login</h3>
        </div>
        <FormGroup>
          <Label>Email:</Label>
          <Input onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="Enter your email.." />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input type="password" onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Enter your password.." />
        </FormGroup>
        <FormGroup>
          <Button onClick={this.signIn} color="primary">Login</Button>
        </FormGroup>
        <FormGroup>
          {/* <Button onClick={this.props.showRegister}>Not registered? Register from here</Button> */}
          <Button onClick={this.showRegister}>Not registered? Register from here</Button>
        </FormGroup>
      </Container>
    )
  }
}
