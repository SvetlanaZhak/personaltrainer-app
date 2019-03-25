import React, { Component } from 'react';
import CustomerList from './components/CustomerList'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h2>Personal Trainer App</h2>
          <CustomerList>
          </CustomerList>

        </header>
      </div>
    );
  }
}

export default App;
