import React, { Component } from 'react';
import {Input, Label, FormGroup, Button, Container} from 'reactstrap';
import {updateProfileFirebase} from '../config/Firebase';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props){
        super(props);
        console.log("Redux..", props)
        this.state = { user:{fullname: props.user.fullname, emal: props.user.email, age: props.user.age},
            email: '',
            //password: props.password,
            firstName: '',
            age: 0
        }
        this.updateProfile = this.updateProfile.bind(this);
        this.showChangePassword = this.showChangePassword.bind(this);
    }
    updateProfile(){
        const {user} = this.state;
        updateProfileFirebase(user.fullname, user.age, user.email);
    }

    showChangePassword(){
        //this.props.updateStateForChangePass(true);
        this.props.history.push('/changePassword');
    }

    static getDerivedStateFromProps(){
        let user = JSON.parse(localStorage.getItem("currentUser"));
        return {user}
    }
    

  render() {
    const {user} = this.state;
    return (
        <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <h3>Profile</h3>
        </div>
        <FormGroup>
            <Label>First Name:</Label>
            <Input value={user.fullname} onChange={(e)=>{this.setState({user:{fullname:e.target.value}})}} placeholder="Enter your first name.." />
        </FormGroup>
        <FormGroup>
            <Label>Email:</Label>
            <Input value={user.email} disabled onChange={(e)=>{this.setState({user:{email:e.target.value}})}} placeholder="Enter your email.." />
        </FormGroup>
        <FormGroup>
            <Label>Age:</Label>
            <Input value={user.age} type="number" onChange={(e)=>{this.setState({user:{age:e.target.value}})}} placeholder="Enter your age.." />
        </FormGroup>
        <FormGroup className="form-inline">
            <Button onClick={this.updateProfile} color="primary">Update Profile</Button>
            <Button onClick={this.showChangePassword} className="ml-2">Change Password</Button>
        </FormGroup>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile);
