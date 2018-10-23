import React from 'react';
import { Table, Button } from 'reactstrap';

export default class ProductTable extends React.Component{

    addProduct = (id) =>{
       this.props.addProduct(id)
    }

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index)=>(
                        <ProductTableTr product={product} addProduct={this.addProduct} />
                    ))}
                </tbody>
            </Table>
        )
    }
}

class ProductTableTr extends React.Component{

    addProduct = () => {
        this.props.addProduct(this.props.product.id)
    }

    render(){
        const {product} = this.props;
        return(
            <tr>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.tag_category}</td>
                <td>{product.tag_value}</td>
                <td><Button color="success" onClick={this.addProduct}>Add {product.id}</Button></td>
            </tr>
        )
    }
}