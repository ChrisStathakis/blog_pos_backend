import React from 'react';
import { Card, CardHeader } from 'reactstrap'

export default class TableCard extends React.Component{

    render() {
        const  { product } = this.props;
        return (
            <Card>
                <CardHeader>{product.title}</CardHeader>
            </Card>
        )
    }

}