import React, { Component } from 'react'
import { Container, Row, Col, FormGroup, Label } from 'reactstrap';
import "react-input-range/lib/css/index.css";

export default class CategoryFilters extends Component {
    constructor(){
        super();

        
    }
    
    selectedCategory(e){
        this.props.currentCategory(e.target.value);
    }

    
    
    render() {
        return (
            
                    <Col md="4">
                        <FormGroup>
                            <Label>Categories</Label>
                            <select className="form-control" onChange={this.selectedCategory.bind(this)}>
                                <option value="0">All</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Furnitures">Furnitures</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Property">Property</option>
                            </select>
                        </FormGroup>
                    </Col>
                    
                    
                
        )
    }
}
