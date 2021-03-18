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
    items: [],
    itemsOnSale: []
  }

  componentDidMount() {
    this.getItems()
    this.getItemsOnSale()
  }

  getItems = async function () {
    let response = await fetch(itemURL)
    let data = await response.json()
    this.setState({ items: data.items })
  }

  getItemsOnSale = async function () {
    let response = await fetch(itemURL + '?isOnSale=true')
    let data = await response.json()
    this.setState({ itemsOnSale: data.items })
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
              <DealsPage items={this.state.itemsOnSale} />
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
