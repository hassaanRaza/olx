import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRoomInfo } from '../redux/chat/action';
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment'
import { sendMessageFirebase } from '../config/Firebase';

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = { id: props.match.params.id, inputVal: '' }
        this.send = this.send.bind(this);
        this.saveInputVal = this.saveInputVal.bind(this);
    }
    componentDidMount() {
        const { id } = this.state;
        this.props.updateRoomFunc(id);
    }
    saveInputVal(e) {
        this.setState({ inputVal: e.target.value });
    }
    send(e) {
        e.preventDefault();
        const { id, inputVal } = this.state;
        const { user } = this.props;
        const obj = { id, inputVal, userId: user.id, createdAt: new Date(), fullname: user.fullname };
        sendMessageFirebase(obj);
        this.setState({
            inputVal: ''
        })
    }
    render() {
        const { id, inputVal } = this.state;
        const { roomInfo, user } = this.props;
        //console.log(user);
        return (
            <Container className="mt-3">
                {

                    roomInfo.map((elem, index) => {

                        return <div className="mb-1" key={index + elem.text}>
                            <h5 style={user.id == elem.userId ? { textAlign: 'right' } : { textAlign: 'left' }}>{elem.fullname}</h5>
                            <h6 style={user.id == elem.userId ? { textAlign: 'right' } : { textAlign: 'left' }}>{elem.text}</h6>
                            <p style={user.id == elem.userId ? { textAlign: 'right' } : { textAlign: 'left' }}>{moment(elem.createdAt.seconds * 1000).fromNow()}</p>
                        </div>
                    })

                }
                <Row className="d-flex justify-content-center">
                    <form>
                        <FormGroup className="form-inline">
                            <Input value={inputVal} onChange={this.saveInputVal} placeholder="Type your message.." />
                            <Input type="Submit" onClick={this.send} className="btn btn-success" value="Send" />
                        </FormGroup>
                    </form>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        roomInfo: state.chatReducer.roomInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRoomFunc: (roomId) => dispatch(getRoomInfo(roomId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);