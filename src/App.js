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
import SearchBar from './components/searchBar';

const pageSize = 6;

class App extends Component {
  state = {
    items: [],
    itemsOnSale: [],
    query: '',
    currPage: 1,
    total: 0
  }

  componentDidMount() {
    this.getItemsLength()
    this.getCurrPage(this.state.currPage)
    this.getItemsOnSale()
  }

  getCurrPage = (pageNum) => {
    window.scrollTo(0, 0)
    fetchItemList(`?from=${(pageNum - 1) * pageSize}&size=${pageSize}&sortDir=asc`)
      .then(data => this.setState({
        items: data.items,
        currPage: pageNum
      }))
  }

  getItemsLength = function () {
    fetchItemList().then(data => this.setState({ total: Math.ceil(data.items.length / pageSize), }))
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
    this.getCurrPage(this.state.currPage)
  }

  render() {
    const { query, items } = this.state
    const noResult = query.length > 0 && items.length == 0
    const notSearching = query.length == 0
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <SearchBar searchItems={this.searchItems} query={this.state.query} clearQuery={this.clearQuery} />
              {noResult
                ? <p className="noresult">No result for current search. Try another word.</p>
                : <>
                  <HomePage items={this.state.items} />
                  {
                    notSearching &&
                    <Pagination currPage={this.state.currPage}
                      getCurrPage={this.getCurrPage}
                      total={this.state.total}
                    />
                  }
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
