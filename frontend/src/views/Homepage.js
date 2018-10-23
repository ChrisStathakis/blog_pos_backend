import React from 'react';
import { withRouter, Link} from 'react-router-dom';
import { Container, Row, Col, CardText } from 'reactstrap'
import MyNavbar from '../components/Navbar.js';
import TableCart from '../components/TableCard.js'
import fetchData from '../components/fetch_data'

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewOrder = this.handleNewOrder.bind(this);
    
    this.state = {
      tables: [],
      doneLoading: false,
      table: undefined,
    }
  }

  getTables() {
    const endpoint = 'http://127.0.0.1:8000/api/table-list/';
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
      console.log(responseData);
      thisComp.setState({
        tables: responseData,
        doneLoading: true
      })
    })
  }

  getTable = (id) => {
    console.log('click getTable');
    const endpoint = `http://127.0.0.1:8000/api/table-detail/${id}/`;
    const thisComp = this;
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    
    fetch(endpoint, lookupOptions).then(
      function(response) {
        console.log('works!')
        return response.json()
      }
    ).then(function(responseData){
      console.log('update table', responseData)
      thisComp.setState({
        table: responseData,
      })
    })
    
  };

  handleNewOrder(id){
    this.getTable(id);
    this.newOrder(id)
  }

  newOrder = (id) => {
    const endpoint = `http://127.0.0.1:8000/api/order-list/`;
    const thisComp = this;
    const data = {
      title: `Table ${id}`,
      table: id,
      active: true
    }
    let lookupOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(endpoint, lookupOptions).then(
      function(response) {
        return response.json()
      }
    ).then(function(responseData){
      thisComp.componentDidMount()
    })
  };

  componentDidMount(){
    this.getTables()
  }

  render() {
      const doneLoading = this.state.doneLoading;
      const tables = this.state.tables;
      return (
          <div>
              <MyNavbar/>
              <Container>
                  {doneLoading !== false ? <MyContainer tables={tables} newOrder={this.handleNewOrder} /> : <p>No data</p>}
                  </Container>
          </div>
      )
  }
}

class FilterContainer extends React.Component {

  render(){
    return <p>Works!</p>
  }
}

class MyContainer extends React.Component{

  render() {
     const { tables } = this.props;
     
     return (
         <div>
             <Row>
                 <Col xs="8">
                     <Row>
                         <h4 className='header'>Title</h4>
                     </Row>
                     <Row>
                         { tables.map((table, index)=>(
                             <TableCart table={table} newOrder={this.props.newOrder} />
                         ))
                         }
                         </Row>
                 </Col>

                 <Col xs="4">
                     <FilterContainer />
                 </Col>
             </Row>
         </div>
     )
  }

}

export default withRouter(Homepage);