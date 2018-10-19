import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardTitle, CardText, Button } from 'reactstrap'

export default class TableCard extends React.Component{

    render() {
        const {table} = this.props
        return (
            <Col xs="6" sm="6">
                <Card>
                    <CardTitle>{table.title}</CardTitle>
                    <CardText>Total value... {table.tag_value}</CardText>
                    {table.is_free ?
                     <Button onClick={() => this.props.newOrder(table.id)} color='success'>New Order </Button>
                     : <Button color='info'>Details </Button>
                    }
                </Card>
                <br />
            </Col>
        )
    }

}

