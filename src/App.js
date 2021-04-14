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
import Pagination from './components/pagination';

const pageSize = 6;

class App extends Component {
  state = {
    items: [],
    currItems: [],
    itemsOnSale: [],
    query: '',
    currPage: 1,
    total: 0
  }

  componentDidMount() {
    this.getCurrPage(this.state.currPage)
    this.getItemsOnSale()
  }

  getCurrPage = (pageNum) => {
    window.scrollTo(0, 0)
    fetchItemList(`?from=${(pageNum - 1) * pageSize}&size=${pageSize}&sortDir=asc`)
      .then(data => this.setState({
        items: data.items,
        total: data.items.length,
        currPage: pageNum
      }))
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

  clearQuery = () => {
    this.setState({ query: '' })
    this.getItems()
  }

  render() {
    const { query, items } = this.state
    const noResult = query.length > 0 && items.length == 0
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="searchBar-container">
            <div className="searchBar">
              <input id="searchBar" onChange={this.searchItems} value={this.state.query} placeholder="Search" />
              <div id="clearSign" onClick={this.clearQuery}>X</div>
              <div id="searchBtn"><i className="fa fa-search"></i></div>
            </div>
          </div>
          <Switch>
            <Route exact path="/">
              {noResult
                ? <p>No Result for Current Search</p>
                : <>
                  <HomePage items={this.state.items} />
                  <Pagination currPage={this.state.currPage}
                    getCurrPage={this.getCurrPage}
                    total={this.state.total}
                  />
                </>
              }
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
