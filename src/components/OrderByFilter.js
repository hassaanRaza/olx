import React, { Component } from 'react'
import { Container, Row, Col, FormGroup, Label } from 'reactstrap';
import "react-input-range/lib/css/index.css";

export default class OrderByFilter extends Component {
    constructor() {
        super();

        
    }


    getOrderBy(e) {
        this.props.getOrderBy(e.target.value);
    }

    render() {
        return (



            <Col md="4">
                <FormGroup>
                    <Label>Order By</Label>
                    <select className="form-control" onChange={this.getOrderBy.bind(this)}>
                        <option value="Latest">Latest</option>
                        <option value="Oldest">Oldest</option>
                    </select>
                </FormGroup>
            </Col>

        )
    }
}
