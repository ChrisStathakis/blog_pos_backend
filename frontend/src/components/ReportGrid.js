import React from 'react';
import {Table} from 'reactstrap';


class ReportGrid extends React.Component{

    render(){
        const orders = this.props.orders.map((order, index)=>(
            <tr>
                <td>{index}</td>
                <td>{order.tag_timestamp}</td>
                <td>{order.title}</td>
                <td>{order.tag_table}</td>
                <td>{order.tag_active}</td>
                <td>{order.tag_value}</td>
            </tr>
        ));
        console.log('my orders!',this.props.orders)
        return(
            <div>
                <h4 className='header'>Orders</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Table</th>
                            <th>Status</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders}
                    </tbody>
                </Table>

            </div>
        )
    }
}

export default ReportGrid;