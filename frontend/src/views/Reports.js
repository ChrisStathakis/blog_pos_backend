import React from 'react';
import MyNavbar from '../components/Navbar.js';
import {Container, Row, Col} from 'reactstrap';
import {fetchData } from '../helpers/fetch_data.js'
import {withRouter} from "react-router-dom";
import ReportGrid from '../components/ReportGrid.js'
import ReportTotalData from "../components/ReportTotalData";
import {ORDER_ITEMS_ENDPOINT, TABLES_ENDPOINT} from "../helpers/endpoints";

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

    getOrders(endpoint){

        const thisComp = this;
        fetchData(endpoint, thisComp, 'orders')
    }

    getTables(){
        const endpoint = TABLES_ENDPOINT;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'tables')
    }

    handleClearFilters = () => {
        const endpoint = 'http://127.0.0.1:8000/api/order-list/';
        this.getOrders(endpoint);
    };

    handleSelectedCategories = (selectedCategories) =>{
        if(selectedCategories){
            const endpoint = ORDER_ITEMS_ENDPOINT + '?table=' + selectedCategories;
            this.getOrders(endpoint)
        }
    };

    componentDidMount() {
        const endpoint = 'http://127.0.0.1:8000/api/order-list/';
        this.getOrders(endpoint);
        this.getTables();
        this.setState({
            doneLoading: true
        })
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
                                handleClearFilters={this.handleClearFilters}
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