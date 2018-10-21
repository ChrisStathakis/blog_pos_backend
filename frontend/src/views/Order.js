import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Card, CardHeader,
    CardTitle, CardText} from 'reactstrap';
import MyNavbar from '../components/Navbar.js';
import ProductTable from '../components/ProductTable.js'
import OrderDetail from '../components/OrderDetails.js'


class Order extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            order_data: undefined,
            doneLoading: false
        }
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
        console.log(endpoint)
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

    componentDidMount(){
        const {id} = 1;
        this.getProducts();
        this.getOrder(id)
    }

    render() {

        return(
            <div>
                <MyNavbar />
                <Container>
                    <Row>
                        {this.state.doneLoading ?
                            <div>
                                <Col xs={8}><ProductPart products={this.state.products} /></Col>
                                <Col xs={4}><OrderPart order_data={this.state.order_data} /></Col>
                            </div>
                            :
                            <Col xs={12}><p>No data</p></Col>
                        }
                    </Row>
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
            <div>
                <Card>
                    <CardHeader>Table {order_data.tag_table}</CardHeader>
                    <div>
                        <CardTitle>
                            Notes.. {order_data.title}
                        </CardTitle>
                        <CardText>Value.. {order_data.tag_value}</CardText>
                        <button>{order_data.tag_status}</button>
                    </div>
                    <OrderDetail order_data={order_data} />
                </Card>
            </div>
        )
    }
}

export default withRouter(Order);