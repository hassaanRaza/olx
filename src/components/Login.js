import React, { Component } from 'react';
import { Input, Label, FormGroup, Button, Container, Row, Col } from 'reactstrap';
import { login, getUserId, loginWithFacebook, loginWithGoogle } from '../config/Firebase';
import { authInfo } from '../config/Routes';
import loader from '../images/loader.gif';
import { updateUser } from '../redux/user/action';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      showLoder: false
    }
    this.signIn = this.signIn.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.loginWithFb = this.loginWithFb.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
  }
  async signIn() {
    const { email, password } = this.state;
    this.setState({ showLoder: true });
    const user = await login(email, password);
    authInfo.login(user);
    this.props.updateUserFunc(user);
    this.props.history.push('/');
    this.setState({ showLoder: false });
  }

  showRegister() {
    this.props.history.push('register');
  }

  async loginWithFb() {
    const user = await loginWithFacebook();
    const obj = { age: "", email: user.email, fullname: user.displayName };
    authInfo.login(obj);
    this.props.updateUserFunc(obj);
    this.props.history.push('/');
    //this.props.currentUser(obj);
  }

  async signInWithGoogle() {
    try {
      const user = await loginWithGoogle();
      console.log(user);
    }
    catch (e) {

    }
  }

  render() {
    const { showLoder } = this.state;
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
          <Row>
            <Col md="12">
              <Button className="mr-1" onClick={this.signIn} color="primary">{showLoder ? 'Wait..' : 'Login'}</Button>
              <Button className="mr-1" onClick={this.loginWithFb} color="info">Facebook Login</Button>
              <Button onClick={this.signInWithGoogle} color="info">Google Login</Button>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          {/* <Button onClick={this.props.showRegister}>Not registered? Register from here</Button> */}
          <Button onClick={this.showRegister}>Not registered? Register from here</Button>
        </FormGroup>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserFunc: (user) => dispatch(updateUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);