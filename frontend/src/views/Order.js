import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import MyNavbar from '../components/Navbar.js';
import ProductTable from '../components/ProductTable.js'
import OrderDetails from '../components/OrderDetails.js'
import Filters from '../components/Filters.js'
import {postData, fetchData, postQtyChange, putData, addOrEditProduct } from '../components/fetch_data.js'

class Order extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            selected_categories: [],
            order_data: '',
            order_items:[],
            order_id: '',
            doneLoading: false
        }
    }

    getCategories(){
        const endpoint = 'http://127.0.0.1:8000/api/category-list/';
        const thisComp = this;
        fetchData(endpoint, thisComp, 'categories' )
    }

    getOrderItems(id){
        const endpoint = `http://127.0.0.1:8000/api/order-item-list?order_related=${id}`;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'order_items')
    }

    getProducts(){
        const endpoint = 'http://127.0.0.1:8000/api/product-list/';
        const thisComp = this;
        fetchData(endpoint, thisComp, 'products')
    }

    getOrder(id){
        const endpoint = `http://127.0.0.1:8000/api/order-detail/${id}/`;
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
    }

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
                const endpoint = `http://127.0.0.1:8000/api/order-detail/${order.id}/`;
                putData(endpoint, data,);
                thisComp.props.history.push('/')
            case 'BACK':
                thisComp.props.history.push('/')
        }
    };

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
        this.getCategories();
        this.getProducts();
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
                            <Col xs="6">
                                <h4 className='header'>Products</h4>
                                {doneLoading ? <ProductTable products={this.state.products} 
                                                             handleAddOrEditProduct={this.handleAddOrEditProduct}                                                             
                                                /> 
                                : <p>No data</p>
                                }
                                
                            </Col>
                            <Col xs="6">
                                <h4 className='header'> Order Details </h4>
                                <Filters categories={this.state.categories}
                                         filterProducts={this.filterProducts}
                                />
                                <br />
                                {doneLoading ?<OrderDetails order_data={this.state.order_data} 
                                                            order_items={this.state.order_items} 
                                                            changeQty={this.changeQty}
                                                            handleTableActions={this.handleTableActions}
                                               /> :<p>No Data</p>}
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