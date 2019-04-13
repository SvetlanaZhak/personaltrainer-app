import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Customer from './components/CustomerList';
import Training from './components/Training'
import FrontPage from './components/HomePage';
import Calendar from './components/Calendar';

import Navigator from './components/Navigator';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Personal Trainer Application</h1>
        </header>
        <BrowserRouter>
          <div>
            <Navigator />
            <Switch>
              <Route exact path="/" render={() => <FrontPage />} />
              <Route path="/customer" component={Customer} />
              <Route path="/training" component={Training} />
              <Route path="/calendar" component={Calendar} />
            </Switch>
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;