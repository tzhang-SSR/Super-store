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
import CartPage from './components/cart'
import fetchItemList from './utils/api';
import ShopContext from './context/shop-context';

const pageSize = 6;

class App extends Component {
  state = {
    items: [],
    itemsOnSale: [],
    query: '',
    currPage: 1,
    total: 0,
    products: [
      { id: 'p1', title: 'yooooo', price: 20.5 },
      { id: 'p2', title: 'yooooo', price: 20.5 },
      { id: 'p3', title: 'yooooo', price: 20.5 }
    ],
    cart: [],
  }

  addProdutToCart = product => {
    let newCart = [...this.state.cart]
    let productIndex = newCart.findIndex(item => item.productID == product.productID)
    if (productIndex < 0) {
      newCart.push(product)
    }
    else {
      newCart[productIndex].quantity += parseInt(product.quantity)
    }
    this.setState({ cart: newCart })
  }

  removeProduct = productID => {
    let newCart = [...this.state.cart]
    let productIndex = newCart.findIndex(item => item.productID == productID)
    newCart.splice(productIndex, 1)
    this.setState({ cart: newCart })
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
        total: Math.ceil(data.total / pageSize),
        currPage: pageNum
      }))
  }

  getItemsOnSale = async function () {
    const isOnSale = '?isOnSale=true'
    fetchItemList(isOnSale).then(data => this.setState({ itemsOnSale: data.items }))
  }

  debounce = (func, delay) => {
    let timeoutID
    return function (...args) {
      if (timeoutID) {
        clearTimeout(timeoutID)
      }
      timeoutID = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  onSearch = (e) => {
    this.setState({ query: e.target.value })
    const str = `?sortDir=asc&q=${e.target.value}`
    this.debounce(fetchItemList(str).then(data => this.setState({ items: data.items })), 5000)
  }

  clearQuery = () => {
    this.setState({ query: '' })
    this.getCurrPage(this.state.currPage)
  }

  render() {
    const { query, items, currPage, total } = this.state
    return (
      <ShopContext.Provider value={{
        products: this.state.products,
        cart: this.state.cart,
        addProdutToCart: this.addProdutToCart,
        removeProduct: this.removeProduct
      }}>
        <div className="App">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <HomePage items={items}
                  query={query}
                  currPage={currPage}
                  total={total}
                  onSearch={this.onSearch}
                  clearQuery={this.clearQuery}
                  getCurrPage={this.getCurrPage}
                />
              </Route>
              <Route path="/deals">
                <DealsPage items={this.state.itemsOnSale} />
              </Route>
              <Route path="/cart">
                <CartPage />
              </Route>
              <Route path="/item/:itemId" component={ItemPage} />
            </Switch>
          </Router>
        </div>
      </ShopContext.Provider>
    );
  }
}

export default App;
