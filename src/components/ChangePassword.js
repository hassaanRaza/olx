import React, { Component } from 'react'
import {Input, Label, FormGroup, Button} from 'reactstrap';
import {changePasswordFirebase} from '../config/Firebase';

export default class ChangePassword extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            email : props.email,
            newPassword : ''
        }
        this.changePassword = this.changePassword.bind(this);
    }
    changePassword(){
        const {newPassword} = this.state;
        changePasswordFirebase(newPassword);
    }
    
    render() {
    const {email} = this.state;
    return (
      <div>
        <h5>Change Password..</h5>
        <FormGroup>
            <Label>Email:</Label>
            <Input value={email} disabled />
        </FormGroup>
        <FormGroup>
            <Label>New Password</Label>
            <Input type="password" onChange={(e)=>{this.setState({newPassword:e.target.value})}} placeholder="Enter your password.." />
        </FormGroup>
        <FormGroup>
            <Button onClick={this.changePassword} color="primary">Save</Button>
        </FormGroup>
      </div>
    )
  }
}
