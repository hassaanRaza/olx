import React, { Component } from 'react';
import {Input, Label, FormGroup, Button, Container} from 'reactstrap';
import { connect } from 'react-redux';
import { updateUserProfile } from '../redux/user/action';

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {user:props.user}
        console.log("Redux..", props);
        this.updateProfile = this.updateProfile.bind(this);
        this.showChangePassword = this.showChangePassword.bind(this);
    }
    updateProfile(){
        const {user} = this.state;
        this.props.updateProfileAction(user.fullname, user.age, user.email);
        alert('Profile updated..');
    }

    showChangePassword(){
        //this.props.updateStateForChangePass(true);
        this.props.history.push('/changePassword');
    }

    // static getDerivedStateFromProps(){
    //     let user = JSON.parse(localStorage.getItem("currentUser"));
    //     return {user}
    // }
    

  render() {
    const {user} = this.state;
    return (
        <Container className="mt-5">
        <div className="d-flex justify-content-center">
          <h3>Profile</h3>
        </div>
        <FormGroup>
            <Label>First Name:</Label>
            <Input value={user.fullname} onChange={(e)=>{this.setState({ user: {...user, fullname:e.target.value}  })}} placeholder="Enter your first name.." />
        </FormGroup>
        <FormGroup>
            <Label>Email:</Label>
            <Input value={user.email} disabled onChange={(e)=>{this.setState({ user: {...user, email:e.target.value}  })}} placeholder="Enter your email.." />
        </FormGroup>
        <FormGroup>
            <Label>Age:</Label>
            <Input value={user.age} type="number" onChange={(e)=>{this.setState({ user: {...user, age:e.target.value}  })}} placeholder="Enter your age.." />
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
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfileAction: (fullname, age, email) => dispatch(updateUserProfile(fullname, age, email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
