import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Card, CardHeader,
    CardTitle, CardText} from 'reactstrap';
import MyNavbar from '../components/Navbar.js';
import ProductTable from '../components/ProductTable.js'
import OrderDetail from '../components/OrderDetails.js'
import Filters from '../components/Filters.js'

class Order extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            selected_categories: [],
            order_data: undefined,
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
                    products: responseData
                })
            }
        )
    }

    getOrder(){
        const endpoint = `http://127.0.0.1:8000/api/order-detail/1/`;
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
                    doneLoading: true
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
        const {id} = 1;
        this.getCategories();
        this.getProducts();
        this.getOrder(id)
    }

    render() {

        return(
            <div>
                <MyNavbar />
                <Container>
                    {this.state.doneLoading ?
                        <Row>
                            <Col xs="8">
                                <h4 className='header'>Products</h4>
                                <ProductPart products={this.state.products} />
                            </Col>
                            <Col xs="4">
                                <h4 className='header'> Order Details </h4>
                                <Filters categories={this.state.categories}
                                         filterProducts={this.filterProducts}
                                />
                                <br />
                                <OrderPart order_data={this.state.order_data} />
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

    render() {
        const products = this.props.products;
        return (
            <ProductTable products={products} />
        )
    }
}

class OrderPart extends React.Component{

    render() {
        const { order_data} = this.props;

        return(
            <Card>
                <CardHeader>Table {order_data.tag_table}</CardHeader>

                        <CardTitle>
                            Notes.. {order_data.title}
                        </CardTitle>
                        <CardText>Value.. {order_data.tag_value}</CardText>
                        <button>{order_data.tag_status}</button>

                <OrderDetail order_data={order_data} />
            </Card>
        )
    }
}

export default withRouter(Order);