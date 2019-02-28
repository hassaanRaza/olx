import React, { Component } from 'react'
import {
    Container, Row, Input, Label, FormGroup, Button, Modal, ModalHeader,
    ModalBody, ModalFooter
} from 'reactstrap';
import { addAd, getCategories } from '../config/Firebase';

export default class Ads extends Component {
    constructor() {
        super();

        this.state = {
            title: '', description: '', price: 0, images: [], modal: false, catVal: '', showLoader: false
        }
        this.add = this.add.bind(this);
        // this.toggle = this.toggle.bind(this);
    }

    async add(e) {
        try{
            e.preventDefault();
            const { title, description, price, images, catVal, showLoader } = this.state;
            if (title != '' && description != '' && price != 0 && images.length > 0 && catVal != "0") {
                this.setState({showLoader:true});
                await addAd(title, description, price, images, catVal);
                this.setState({showLoader:false});
            }
            else {
                alert('All fields are required!');
            }
        }
        catch(e){
            this.setState({showLoader:false});
        }

    }

    componentDidMount() {
        // getCategories().then((res)=>{
        //     console.log(res[0]);
        //     this.setState({catList:res[0]})
        // })
    }

    render() {
        const {showLoader} = this.state;
        return (
            <div>
                <Modal isOpen={this.props.modalState} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggle}>Add your item</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup>
                                <Label>Category:</Label>
                                <select className="form-control" onChange={(e) => { this.setState({ catVal: e.target.value }) }}>
                                    <option value="0">Select</option>
                                    <option value="Mobiles">Mobiles</option>
                                    <option value="Furnitures">Furnitures</option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Property">Property</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <Label>Title:</Label>
                                <Input onChange={(e) => { this.setState({ title: e.target.value }) }} type="text" placeholder="Enter your title.." required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description:</Label>
                                <Input onChange={(e) => { this.setState({ description: e.target.value }) }} type="textarea" placeholder="Enter your description.." required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Price:</Label>
                                <Input onChange={(e) => { this.setState({ price: e.target.value }) }} type="number" placeholder="Enter price.." required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Images:</Label>
                                <Input multiple onChange={(e) => { this.setState({ images: e.target.files }) }} type="file" required />
                            </FormGroup>
                            
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.add} color="success">{showLoader ? 'Please wait..' : 'Submit'}</Button>
                        <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}
