import React from 'react';
import MyNavbar from '../components/Navbar.js';
import { Row, Col, Table } from 'reactstrap';
import ProductTable from'../components/ProductTable.js'
import Filters from '../components/Filters.js';

class Products extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            doneLoading: false
        }
    }

    getProducts() {
        const endpoint = 'http://127.0.0.1:8000/api/product-list/';
        const thisComp = this;
        let lookUpOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }   
        };
        fetch(endpoint, lookUpOptions).then(
            function(response){
                return response.json()
            }
        ).then(
            function(responseData){
                thisComp.setState({
                    products: responseData,
                    doneLoading: true
                })
            }
        )
    }

    getCategories(){
        const endpoint = 'http://127.0.0.1:8000/api/category-list/';
        const thisComp = this;
        let lookUpOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }   
        };
        fetch(endpoint, lookUpOptions).then(
            function(response){
                return response.json()
            }
        ).then(
            function(responseData){
                thisComp.setState({
                    categories: responseData
                })
            }
        )
    }
    
    componentDidMount(){
        this.getCategories();
        this.getProducts()
    }

    render() {
        const {products} = this.state;
        const {categories} = this.state;
        const {doneLoading} = this.state;

        return (
            <div>
                <MyNavbar/>
                <Row>
                    <Col xs='8'>
                        <h4>Product List</h4>
                        {doneLoading ? <ProductTable products={products} />:<p>No data</p>}
                    </Col>
                    <Col xs='4'>
                        {doneLoading ? <Filters categories={categories} />: <p>No data</p>}
                    </Col>
                </Row>
          </div>
        )
    }
}

export default Products