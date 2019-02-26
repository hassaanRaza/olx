import React, { Component } from 'react';
import {Input, Label, FormGroup, Button, Container} from 'reactstrap';
import {updateProfileFirebase} from '../config/Firebase';


export default class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: props.email,
            password: props.password,
            firstName: props.fullname,
            age: props.age
        }
        this.updateProfile = this.updateProfile.bind(this);
        this.showChangePassword = this.showChangePassword.bind(this);
    }
    updateProfile(){
        const {firstName, email, password, age} = this.state;
        updateProfileFirebase(firstName, age, email);
    }

    showChangePassword(){
        this.props.updateStateForChangePass(true);
    }

  render() {
    const {email, password, firstName, age} = this.state;
    return (
        <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <h3>Profile</h3>
        </div>
        <FormGroup>
            <Label>First Name:</Label>
            <Input value={firstName} onChange={(e)=>{this.setState({firstName:e.target.value})}} placeholder="Enter your first name.." />
        </FormGroup>
        <FormGroup>
            <Label>Email:</Label>
            <Input value={email} disabled onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="Enter your email.." />
        </FormGroup>
        <FormGroup>
            <Label>Age:</Label>
            <Input value={age} type="number" onChange={(e)=>{this.setState({age:e.target.value})}} placeholder="Enter your age.." />
        </FormGroup>
        <FormGroup className="form-inline">
            <Button onClick={this.updateProfile} color="primary">Update Profile</Button>
            <Button onClick={this.showChangePassword} className="ml-2">Change Password</Button>
        </FormGroup>
      </Container>
    )
  }
}
