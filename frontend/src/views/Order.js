import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Card, CardHeader,
    CardTitle, CardText} from 'reactstrap';
import MyNavbar from '../components/Navbar.js';
import ProductTable from '../components/ProductTable.js'
import OrderDetail from '../components/OrderDetails.js'
import Filters from '../components/Filters.js'
import {postData, fetchData } from '../components/fetch_data.js'

class Order extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            selected_categories: [],
            order_data: {},
            order_items:[],
            order_id: '',
            doneLoading: false
        }
    }

    getCategories(){
        const endpoint = 'http://127.0.0.1:8000/api/category-list/';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions).then((resp)=>resp.json()).then(
            (responseData) => {
                thisComp.setState({
                    categories:responseData
                })
            }
        )
    }

    getOrderItems(){
        const endpoint = `http://127.0.0.1:8000/api/order-item-list?product_related=&order_related=${this.state.order_id}`;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'order_items')
    }

    getProducts(){
        const endpoint = 'http://127.0.0.1:8000/api/product-list/';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions).then(
            function (response) {
                return response.json()
            }
        ).then(
            function (responseData) {
                thisComp.setState({
                    products: responseData,
                    doneLoading: true
                })
            }
        )
    }

    getOrder(id){
        const endpoint = `http://127.0.0.1:8000/api/order-detail/${id}/`;
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(endpoint, lookupOptions).then(
            function(response) {
                return response.json()
            }
            ).then(function(responseData){
                thisComp.setState({
                    order_data: responseData,
                    
                })
            })

    }

    filterProducts = (id) => {
        let categories = this.state.selected_categories;
        if (categories.indexOf(id)> -1 ){
            this.setState({
                selected_categories: this.state.selected_categories.filter((i) => i !== id)
            })
        } else{
            this.setState({
                selected_categories: categories.concat(id)
            })
        }

    };

    componentDidMount(){
        const {id} = this.props.match.params;
        this.setState({
            order_id: id
        });
        this.getOrderItems();
        this.getCategories();
        this.getOrder(id);
        this.getProducts()
    }

    render() {
        const doneLoading = this.state.doneLoading;
        const my_id = this.state.order_id;
        return(
            <div>
                <MyNavbar />
                <Container>
                    {this.state.doneLoading ?
                        <Row>
                            <Col xs="8">
                                <h4 className='header'>Products</h4>
                                {doneLoading ? <ProductPart products={this.state.products} my_id={my_id}  /> : <p>No data</p>}
                                
                            </Col>
                            <Col xs="4">
                                <h4 className='header'> Order Details </h4>
                                <Filters categories={this.state.categories}
                                         filterProducts={this.filterProducts}
                                />
                                <br />
                                {doneLoading ?<OrderPart order_data={this.state.order_data} order_items={this.state.order_items} /> :<p>No Data</p>}
                            </Col>
                        </Row>
                        :
                        <Col xs={12}><p>No data</p></Col>
                    }
                </Container>
            </div>
        )
    }

}

class ProductPart extends React.Component {

    addProduct = (id) => {
        console.log('product id', id);
        const product_id = id;
        const thisComp = this;
        const order_id = this.props.my_id;
        const endpoint = `http://127.0.0.1:8000/api/order-item-list?product_related=${product_id}&order_related=${order_id}`
        
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions).then(
            function(response){
                return response.json()
            }
        ).then(
            function(responseData){
                const myResponse = responseData;
                if (myResponse.length > 0){
                    const data = {
                        id: myResponse.id,
                        product_related: product_id,
                        order_related: order_id,
                        qty: myResponse + 1,
                        value: myResponse.value
                    };
                    postData('http://127.0.0.1:8000/api/order-item-list', data)
                } else {
                    const data = {
                        product_related: product_id,
                        order_related: order_id,
                        qty: 1,

                    };
                    console.log('New', data);
                    postData('http://127.0.0.1:8000/api/order-item-list', data)
                }
            }
        )
    };

    render() {
        const products = this.props.products;
        return (
            <ProductTable products={products} my_id={this.props.my_id} addProduct={this.addProduct} />
        )
    }
}

class OrderPart extends React.Component{

    render() {
        const  {order_data} = this.props;

        return(
            <Card>
                <CardHeader>Table {order_data.tag_table}</CardHeader>
                <CardTitle>Notes.. {order_data.title}</CardTitle>
                <CardText>Value.. {order_data.tag_value}</CardText>
                <button>{order_data.tag_status}</button>
                <OrderDetail order_items={this.props.order_items} />
            </Card>

        )
    }
}

export default withRouter(Order);