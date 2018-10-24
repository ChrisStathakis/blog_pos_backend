import React from 'react';
import { Table } from 'reactstrap'

export default class OrderDetails extends React.Component{

    render() {
        const { order_items } = this.props;

        return (
            <div>
                <h4 className='header'>Order Items</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Qty</th>
                            <th>Value</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {order_items.map((item, index)=>(
                        <OrderItem item={item} addProduct={this.addProduct} />
                    ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

class OrderItem extends React.Component{

    render(){
        const item = this.props.item;
        return (
            <tr>
                <td>{item.tag_product_related}</td>
                <td>{item.qty}</td>
                <td>{item.value}</td>
                <td><button className="btn"><i className="fa fa-home" /></button></td>
            </tr>
        )
    }

}