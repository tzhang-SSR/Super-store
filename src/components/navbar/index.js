import ShopContext from '../../context/shop-context'
import { NavLink as Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    return (
        <ShopContext.Consumer>
            {context => (
                <div className="navbar">
                    <div>
                        <Link to="/"><h1>Super Store</h1></Link>
                    </div>
                    <div className="links">
                        <Link to="/" activeClassName="selected" exact>Home</Link>
                        <Link to="/deals" activeClassName="selected">Deals</Link>
                        <Link to="/cart" activeClassName="selected">
                            <span>Cart </span>
                            {context.cart.length > 0 &&
                                <span id="itemcount">
                                    {context.cart.reduce((count, curItem) => count + parseInt(curItem.quantity), 0)}
                                </span>
                            }
                        </Link>
                        <Link to="/"><span id="signin">Sign In</span></Link>
                    </div>
                </div>)}
        </ShopContext.Consumer>
    )
}


export default Navbar;