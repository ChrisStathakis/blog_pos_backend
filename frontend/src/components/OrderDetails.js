import React from 'react';
import { Table } from 'reactstrap'

export default class OrderDetails extends React.Component{

    render() {
        const { order_data } = this.props;

        return (
            <div>

                <h4 className='header'>Order Items</h4>
                <Table>
                    <thead>

                    </thead>

                </Table>
            </div>
        )
    }
}