import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap'
import MyNavbar from '../components/Navbar.js';


export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: []
    }
  }

  render() {

    return (
        <div>
          <MyNavbar/>
            <Container>

            </Container>
        </div>
    )
  }
}


class MyContainer {

  render() {
     return (
         <div>
           <Row>

             <Col>
             </Col>

             <Col>
             </Col>
           </Row>
         </div>
     )
  }

}

