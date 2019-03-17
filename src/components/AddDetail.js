import React, { Component } from 'react'
import Gallery from 'react-grid-gallery';
import { Container, Col, Row, Button } from 'reactstrap';
import { getAdByIdFirebase, firebase, checkAndCreateChatRoomFirebase, getLocationByName } from '../config/Firebase';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default class Adddetail extends Component {
  constructor(props) {
    super(props);

    this.state = { id: props.match.params.id, addObj: {}, location:{ lat: 0, lng: 0 }}
    this.getAdById = this.getAdById.bind(this);
  }
  async getAdById() {
    const { id } = this.state;
    try {
      const obj = await getAdByIdFirebase(id);
      if (obj["location"] != undefined) {
        const locationObj = await getLocationByName(obj.location);
        this.setState({location:{ lat: locationObj.lat, lng: locationObj.lng }});
      }
      this.setState({ addObj: obj });
    }
    catch (e) {
      alert(e.message);
    }
  }
  componentDidMount() {
    this.getAdById();
  }
  checkAndCreateChatRoom(obj) {
    const seller = obj.id;
    const currentUser = firebase.auth().currentUser.uid;
    // console.log('currentUser=>', currentUser);
    // console.log('seller=>', seller);
    checkAndCreateChatRoomFirebase(currentUser, seller).then(res => {
      if (res) {
        this.props.history.push({
          pathname: `/chat/${res.id}`
        })
      }
    });
  }
  render() {
    const { addObj, location } = this.state;
    //console.log(lat, lng);
    var imagesArray = [];
    if (addObj.images) {
      addObj.images.map((elem) => {
        const obj = { src: elem, thumbnail: elem, thumbnailWidth: 320, thumbnailHeight: 174 };
        imagesArray.push(obj);
      })
    }
    return (
      <Container>
        <Row className="mt-3">
          <Col md="5">
            <h2>{addObj.category}</h2>
            <h3>{addObj.title}</h3>
            <h4>RS {addObj.price}</h4>
            <h5>{addObj.description}</h5>
            <Button onClick={this.checkAndCreateChatRoom.bind(this, addObj.user)} color="success">Chat with seller</Button>
          </Col>
          <Col md="7">
            <Gallery images={imagesArray} />

          </Col>

        </Row>
        <Row className="mt-2 mb-2">
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px`, width: `100%`}} />}
            mapElement={<div style={{ height: `100%` }}  /> }
            location={location}
          />
        </Row>
      </Container>
    )
  }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.location}
    center={props.location}
  >
    {props.isMarkerShown && <Marker position={props.location} />}
  </GoogleMap>
))
