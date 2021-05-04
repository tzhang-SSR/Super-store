import ShopContext from '../../context/shop-context'
import React, { Component } from 'react';

class Cart extends Component {
    static contextType = ShopContext

    componentDidMount = () => {
        console.log(this.context)
    }

    render() {
        return (
            <p>This is the cart page</p>
        );
    }
}

export default Cart;
