import React from 'react';
import { Row, Col, Table } from 'reactstrap'


class Products extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    render() {

        return (
            <div>
                <Row>
                    <Col xs='8'>
                        <h4>Product List</h4>
                        <Table>

                        </Table>
                    </Col>
                    <Col xs='4'>

                    </Col>
                </Row>

            </div>
        )
    }
}