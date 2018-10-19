import React, { Component } from 'react';
import Homepage from './views/Homepage.js'

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="App">
          <Homepage />
      </div>
    );
  }
}

export default App;