import React from 'react';
import PropTypes from 'prop-types';
import MyNavbar from '../components/Navbar.js';
import {Container, Row, Col} from 'reactstrap';
import {fetchData } from '../helpers/fetch_data.js'
import {withRouter} from "react-router-dom";
import ReportGrid from '../components/ReportGrid.js'
import ReportTotalData from "../components/ReportTotalData";
import {ORDER_ITEMS_ENDPOINT, TABLES_ENDPOINT, ORDERS_ENDPOINT} from "../helpers/endpoints";

class Report extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            tables: [],
            date_start: new Date(),
            date_end: new Date(),
            doneLoading: false
        }
    }

    static  childContextTypes = {
        clearFilters: PropTypes.func
    };

    getChildContext(){
        return{
            clearFilters: this.handleClearFilters
        }
    }

    getOrders(endpoint, type_=false){
        const thisComp = this;
        fetchData(endpoint, thisComp, 'orders', type_)
    }

    getTables(){
        const endpoint = TABLES_ENDPOINT;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'tables', true)
    }

    handleClearFilters = () => {
        this.componentDidMount()
    };

    handleSelectedCategories = (selectedCategories) =>{
        if(selectedCategories){
            const endpoint = ORDERS_ENDPOINT + '?table=' + selectedCategories;
            this.getOrders(endpoint)
        }
    };

    componentDidMount() {
        this.getOrders(ORDERS_ENDPOINT, false);
        this.getTables();
    }
    
    render() {
        return(
             <div>
                <MyNavbar />
                <Container>
                    <Row>
                        <Col xs="8">
                            <ReportGrid orders={this.state.orders} />
                        </Col>
                        <Col xs="4">
                            <ReportTotalData
                                categories={this.state.tables}
                                handleSelectedCategories={this.handleSelectedCategories}
                            />
                        </Col>
                    </Row>
                </Container>
             </div>
        )
    }

}

export default withRouter(Report);