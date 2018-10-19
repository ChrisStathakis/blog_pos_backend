import React from 'react';
import {Table} from 'reactstrap';


class MyTable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount(){
        this.setState({
            orders: this.props.orders
        })
    }

    render() {
        const orders = this.state.orders.map((order, index) =>
            (
                <tr>
                    <td>{index}</td>
                    <td>{order.title}</td>
                    <td>{order.costumer}</td>
                    <td>{order.value}</td>
                    <td><button className='btn btn-primary'>Details</button></td>
                </tr>
        ));
        return(
            <Table className='table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Table</th>
                        <th>Costumer</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        )
    }
}

export default MyTable