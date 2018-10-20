import React from 'react';
import { Table } from 'reactstrap';

export default class ProductTable extends React.Component{

    render(){
        const products = this.props.products;

        return(
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index)=>(
                        <tr>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.tag_category}</td>
                            <td>{product.tag_value}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}