import React from 'react';
import { Table,  Card, CardHeader,
    CardTitle, CardText, Button } from 'reactstrap'

export default class OrderDetails extends React.Component{

    changeQty = (action, item_id) => {
        this.props.changeQty(action, item_id)
    };

    handleCloseTable = () => {
        this.props.handleTableActions('CLOSE')
    };
    handleBack = () => {
        this.props.handleTableActions('BACK')
    };

    render() {
        const { order_items } = this.props;
        const { order_data} = this.props;
        return (
            <div>
            <Card>
                <CardHeader>Table {order_data.tag_table}</CardHeader>
                <CardTitle>Notes.. {order_data.title}</CardTitle>
                <CardText>Value.. {order_data.tag_value}</CardText>
                <button>{order_data.tag_status}</button>
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
                        <OrderItem item={item} changeQty={this.changeQty} />
                    ))}
                    </tbody>
                </Table>
            </Card>
                <Card>
                    <CardHeader>Actions</CardHeader>
                    <CardTitle>
                        <Button color='primary' onClick={this.handleCloseTable}>Close Table</Button>
                        <Button color='warning' onClick={this.handleBack}>Back </Button>
                    </CardTitle>
                </Card>

            </div>

        )
    }
}

class OrderItem extends React.Component{

    addQty = () => {
        this.props.changeQty('ADD', this.props.item.id)
    }

    removeQty = () => {
        this.props.changeQty('REMOVE', this.props.item.id)
    }

    handleDeleteItem = () => {
        this.props.changeQty('DELETE', this.props.item.id)
    }

    render(){
        const item = this.props.item;
        return (
            <tr>
                <td>{item.tag_product_related}</td>
                <td>{item.qty}</td>
                <td>{item.value}</td>
                <td>
                    <button onClick={this.addQty} className="btn btn-success"><i className="fa fa-angle-up" /></button>
                    <button onClick={this.removeQty} className="btn btn-warning"><i className="fa fa-angle-down" /></button>
                    <button onClick={this.handleDeleteItem} className="btn btn-danger"><i className="fa fa-trash-alt" /></button>
                    </td>
            </tr>
        )
    }

}