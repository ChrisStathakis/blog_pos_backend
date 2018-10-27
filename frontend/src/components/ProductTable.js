import React from 'react';
import { Table, Button } from 'reactstrap';
import Filters from './Filters.js'
import {fetchData} from "./fetch_data";

export default class ProductGrid extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleForm: false,
            products: [],
            categories: [],
            doneLoading: false
        }
    }

    getCategories(){
        const endpoint = 'http://127.0.0.1:8000/api/category-list/';
        const thisComp = this;
        fetchData(endpoint, thisComp, 'categories')
    }

    getProducts(endpoint){
        const thisComp = this;
        fetchData(endpoint, thisComp, 'products')
    }

    handleSelectedCategories = (categories_list) =>{
        if (categories_list){
            const endpoint = 'http://127.0.0.1:8000/api/product-list/'+ '?category='+ categories_list;
            console.log(endpoint)
            this.getProducts(endpoint)  
        }
    }

    handleToggleForm = (e) => {
        e.preventDefault();
        this.setState({
            toggleForm: !this.state.toggleForm
        })
    };

    componentDidMount(){
        const endpoint = 'http://127.0.0.1:8000/api/product-list/';
        this.getCategories();
        this.getProducts(endpoint);
        this.setState({
            doneLoading: true
        })
    }
    
    render(){
        const { doneLoading } = this.state;
        const {categories} = this.state;
        console.log(categories)
        if(this.state.toggleForm && categories.length > 0){
            return(
                <div>
                    <Button color='primary'onClick={this.handleToggleForm}>Close</Button>
                    <Filters 
                        categories={categories}
                        handleSelectedCategories={this.handleSelectedCategories}
                        />
                </div>
            )
        } else {
            return(
                <div>
                    <Button 
                        color='primary'
                        onClick={this.handleToggleForm}
                        >Filters
                    </Button>

                    <ProductTable 
                        products={this.state.products}
                        handleAddOrEditProduct={this.props.handleAddOrEditProduct}
                    />
                </div>
            )
        }
    }
}

class ProductTable extends React.Component{

    addProduct = (id) =>{
       this.props.handleAddOrEditProduct(id)
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