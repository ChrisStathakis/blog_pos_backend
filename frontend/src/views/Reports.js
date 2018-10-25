import React from 'react';
import fetchData from '../components/fetch_data.js';

class Report extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            date_start: '',
            date_end: '',
            doneLoading: false
        }

    }

    getOrders(){
        const endpoint = '';
        const thisComp = this;
        fetchData(endpoint, thisComp, 'orders')
    }

    componentDidMount() {
        this.getOrders()
        this.setState({
            doneLoading: true
        })
    }
    
    render() {

        return(
            <div>rf</div>
        )
    }

}