import React, { Component } from 'react'
import { Input, Label, FormGroup, Button, Container } from 'reactstrap';
import { changePasswordFirebase } from '../config/Firebase';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            email: props.email,
            newPassword: ''
        }
        this.changePassword = this.changePassword.bind(this);
    }
    changePassword() {
        const { newPassword } = this.state;
        changePasswordFirebase(newPassword);
    }
    static getDerivedStateFromProps(){
        let user = JSON.parse(localStorage.getItem("currentUser"));
        return {user};
    }
    render() {
        const { email, user } = this.state;
        return (
            <Container className="mt-5">
                <div className="d-flex justify-content-center">
                    <h3>Change Password</h3>
                </div>

                <FormGroup>
                    <Label>Email:</Label>
                    <Input value={user.email} disabled />
                </FormGroup>
                <FormGroup>
                    <Label>New Password</Label>
                    <Input type="password" onChange={(e) => { this.setState({ newPassword: e.target.value }) }} placeholder="Enter your password.." />
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.changePassword} color="primary">Save</Button>
                </FormGroup>
            </Container>
        )
    }
}
