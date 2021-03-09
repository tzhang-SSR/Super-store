import './App.css';
import Navbar from './components/navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <p>This is the homepage</p>
          </Route>
          <Route path="/deals">
            <p>This is the deals page</p>
          </Route>
          <Route path="/cart">
            <p>This is the cart page</p>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
