import React, { Component } from 'react'
import Gallery from 'react-grid-gallery';
import {Container, Col, Row} from 'reactstrap';
import {getAdByIdFirebase} from '../config/Firebase';


export default class Adddetail extends Component {
    constructor(props){
      super(props);
      
      this.state = {id:props.match.params.id, addObj:{}}

      this.getAdById = this.getAdById.bind(this);
    }
    async getAdById(){
      const {id} = this.state;
      try{
        const obj = await getAdByIdFirebase(id);
        this.setState({addObj:obj});
      }
      catch(e){
        alert(e.message);
      }
    }
    componentDidMount(){
      this.getAdById();
    }
  render() {
    const {addObj} = this.state;
    var imagesArray = [];
    if(addObj.images){
      addObj.images.map((elem)=>{
        const obj = {src:elem, thumbnail:elem, thumbnailWidth:320, thumbnailHeight: 174};
        imagesArray.push(obj);
      })
    }
    return (
      <Container>
        <Row className="mt-3">
          <Col md="5">
            <h2>{addObj.category}</h2>
            <h3>{addObj.title}</h3>
            <h4>{addObj.price}</h4>
            <h5>{addObj.description}</h5>
          </Col>
          <Col md="7">
            <Gallery images={imagesArray}/>
          </Col>
        </Row>
      </Container>
    )
  }
}
