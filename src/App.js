import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/navbar';
import HomePage from './components/home';
import ItemPage from './components/item';
import DealsPage from './components/deal';

const itemURL = 'https://gp-super-store-api.herokuapp.com/item/list';

class App extends Component {
  state = {
    items: []
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async function () {
    let response = await fetch(itemURL)
    let data = await response.json()
    this.setState({ items: data.items })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage items={this.state.items} />
            </Route>
            <Route path="/deals">
              <DealsPage items={this.state.items.filter(item => item.isOnSale)}/>
            </Route>
            <Route path="/cart">
              <p>This is the cart page</p>
            </Route>
            <Route path="/item/:itemId" component={ItemPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
