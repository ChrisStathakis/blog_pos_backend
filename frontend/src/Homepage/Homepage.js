import React from 'react';

import MyNavbar from './Navbar.js'
import MyTable from './Body.js';


class Homepage extends React.Component{

    render(){
        const orders = [];

        return(
            <div>
                <MyNavbar/>
                <div className='row'>
                    <div className='col-md-6'>
                        <h4>Active Orders</h4>
                        <MyTable orders={orders} />
                    </div>
                </div>
            </div>

        )
    }
}


export default Homepage;