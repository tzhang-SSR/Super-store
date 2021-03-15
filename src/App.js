import './App.css';
import Navbar from './components/navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './components/home';
import ItemPage from './components/item';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/deals">
            <p>This is the deals page</p>
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

export default App;
