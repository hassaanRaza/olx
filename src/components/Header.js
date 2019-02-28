import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Input } from 'reactstrap';
import { authInfo } from '../config/Routes';
import { firebaseLogout } from '../config/Firebase';


export default class Header extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = { user: null }

        this.logout = this.logout.bind(this);
    }

    logout() {
        firebaseLogout().then((res) => {
            if (res === 'Done') {
                //localStorage.removeItem("currentUser");
                

                //this.props.removeCurrentUser(null);
            }
        })
        authInfo.logout();
        this.setState({ user: null });
        //this.props.history.push('login');
    }
    static getDerivedStateFromProps(){
        let user = JSON.parse(localStorage.getItem("currentUser"));
        return {user};
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("currentUser"));
        //console.log(currentUser);
        if (user) {
            this.setState({
                user
            })
        }
    }

    render() {
        const { user } = this.state;
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand style={{ fontSize: '2em' }}>
                    <Link style={{ textDecoration: 'none', color: '#000' }} to="/">OLX</Link>
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {user != null &&
                            
                            <NavLink onClick><Link to="/profile">Profile</Link></NavLink>
                        }
                    </NavItem>
                    <NavItem>
                        {user == null ?
                            <NavLink><Link to="/login">Login</Link></NavLink>
                            : <NavLink onClick={this.logout}><Link to="/login">Logout</Link></NavLink>
                        }
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}
