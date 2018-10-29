import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import MyNavbar from '../components/Navbar.js';
import ProductGrid from '../components/ProductTable.js'
import OrderDetails from '../components/OrderDetails.js'
import {fetchData, postQtyChange, putData, addOrEditProduct } from '../helpers/fetch_data.js'
import {ORDER_ITEMS_ENDPOINT, ORDER_ENDPOINT} from '../helpers/endpoints.js'


class Order extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selected_categories: [],
            order_data: '',
            order_items:[],
            order_id: '',
            doneLoading: false
        }
    }

    static childContextTypes = {
        handleAddOrEditProduct: PropTypes.func
    };

    getChildContext(){
        return {
            handleAddOrEditProduct: this.handleAddOrEditProduct
        }
    }

    getOrderItems(id){
        const endpoint = ORDER_ITEMS_ENDPOINT + '?order_related=' + id;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'order_items')
    }

    getOrder(id){
        const endpoint = ORDER_ENDPOINT+ id + '/';
        const thisComp = this;
        fetchData(endpoint, thisComp, 'order_data');
        
    }

    changeQty = (action, item_id) => {
        const thisComp = this;
        postQtyChange(action, item_id, thisComp);
    };

    handleAddOrEditProduct = (product_id) => {
        const thisComp = this;
        addOrEditProduct(this.state.order_data.id, product_id, thisComp);
    };

    handleTableActions = (action) => {
        const thisComp = this;
        switch (action){
            case 'CLOSE':
                const order = this.state.order_data;
                let data = {
                    id: order.id,
                    title: order.title,
                    table: order.table,
                    active: false,
                };
                const endpoint = ORDER_ENDPOINT + order.id + '/';
                putData(endpoint, data,);
                break;
            default:
                console.log('oups!')
        }
        thisComp.props.history.push('/')
    };

    componentDidMount(){
        const {id} = this.props.match.params;
        this.getOrder(id) ;
        this.getOrderItems(id);
        this.setState({
            order_id: this.state.order_data.id,
            doneLoading: true
        })
    }

    render() {
        const doneLoading = this.state.doneLoading;
        return(
            <div>
                <MyNavbar />
                <Container>
                    {this.state.doneLoading ?
                        <Row>
                            <Col xs="6" sm="12">
                                <h4 className='header'>Products</h4>
                                {doneLoading ?
                                    <ProductGrid
                                        handleSelectedCategories={this.handleSelectedCategories}
                                    />
                                : <p>No data</p>
                                }
                                
                            </Col>
                            <Col xs="6" sm="12">
                                <h4 className='header'> Order Details </h4>
                                <br />
                                {doneLoading ?
                                    <OrderDetails
                                        order_data={this.state.order_data}
                                        order_items={this.state.order_items}
                                        changeQty={this.changeQty}
                                        handleTableActions={this.handleTableActions}
                                    />
                                    :
                                    <p>No Data</p>
                                }
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

export default withRouter(Order);