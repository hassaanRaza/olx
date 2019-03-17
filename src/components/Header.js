import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Input } from 'reactstrap';
import { authInfo } from '../config/Routes';
import { firebaseLogout } from '../config/Firebase';
import { connect } from 'react-redux';
import { removeUser } from '../redux/user/action';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.user }
        this.logout = this.logout.bind(this);
    }

    logout() {
        firebaseLogout().then((res) => {
            if (res === 'Done') {
                
            }
        })
        authInfo.logout();
        this.props.removeUserFunc();
        this.setState({ user: this.props.user });
        
    }
    static getDerivedStateFromProps(props){
        let user = props.user;
        return {user};
    }
    
    render() {
        const { user } = this.state;
        return (
            <Navbar color="dark" light expand="md">

                <Link style={{ textDecoration: 'none', color: '#fff' }} to="/">OLX</Link>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {user != null &&

                            <Link className="mr-2" style={{ textDecoration: 'none', color: '#fff' }} to="/profile">Profile</Link>
                        }
                    </NavItem>
                    <NavItem>
                        {user == null ?
                            <Link style={{ textDecoration: 'none', color: '#fff' }} to="/login">Login</Link>
                            : <Link style={{ textDecoration: 'none', color: '#fff' }} onClick={this.logout} to="/login">Logout</Link>
                        }
                    </NavItem>
                </Nav>
            </Navbar>
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
        removeUserFunc: (user) => dispatch(removeUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);