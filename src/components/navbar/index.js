import './navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div>
                <h1>Super Store</h1>
            </div>
            <div className="links">
                <a href="/">Home</a>
                <a href="/">Deals</a>
                <a href="/">Cart</a>
                <a href="/">Sign In</a>
            </div>
        </div>
    )
}


export default Navbar;