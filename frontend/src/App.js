import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from './views/Homepage.js';
import Products from './views/Products.js';
import Order from './views/Order.js';
import Report from './views/Reports.js'

class App extends React.Component{

  render(){
    return(
      <BrowserRouter>
        <Switch>
            <Route exact path="/products/" component={Products} />
            <Route exact path="/order/:id/" component={Order}/>
            <Route exact path="/reports/" component={Report} />


            <Route component={Homepage} />
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;