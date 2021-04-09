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
import fetchItemList from './utils/api';
import search_solid from './img/search_solid.svg'

class App extends Component {
  state = {
    items: [],
    itemsOnSale: [],
    query: ''
  }

  componentDidMount() {
    this.getItems()
    this.getItemsOnSale()
  }

  getItems = function () {
    fetchItemList().then(data => this.setState({ items: data.items }))
  }

  getItemsOnSale = async function () {
    const isOnSale = '?isOnSale=true'
    fetchItemList(isOnSale).then(data => this.setState({ itemsOnSale: data.items }))
  }

  searchItems = (e) => {
    this.setState({ query: e.target.value })
    const str = `?sortDir=asc&q=${e.target.value}`
    fetchItemList(str).then(data => this.setState({ items: data.items }))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="searchBar-container">
            <div className="searchBar">
              <input id="searchBar" onChange={this.searchItems} value={this.state.query} placeholder="Search" />
              <div id="clearSign">X</div>
              <div id="searchBtn"><i className="fa fa-search"></i></div>
            </div>
          </div>
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
