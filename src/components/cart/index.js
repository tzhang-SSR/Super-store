import ShopContext from '../../context/shop-context'
import React, { Component } from 'react';
import './cart.css';
import default_img from '../../img/product-default-img.jpg';

const ItemCard = (item, addDefaultSrc) => {
    return (
        <div className="cartItem">
            <div className="itemContent">
                <img src={item.imageUrl} onError={addDefaultSrc} alt={item.name} />
                <div className="text">
                    <p className="text-name">
                        <b>{item.name}</b>
                    </p>
                    <p>
                        <span>Quantity: </span>
                        <div className="text-quantityBlock">{item.quantity}</div>
                        <span className="text-remove">Remove</span>
                    </p>

                </div>
            </div>
            <p className="itemPrice"><b>${item.price}</b></p>
        </div>)
}

class Cart extends Component {
    static contextType = ShopContext

    componentDidMount = () => {
        console.log(this.context)
    }

    addDefaultSrc = (e) => {
        e.target.src = default_img
    }

    render() {
        const { cart } = this.context
        return (
            <div className="cart">
                { cart.length
                    ? <>
                        {cart.map((item, index) =>
                            <ItemCard item={item} key={index} addDefaultSrc={this.addDefaultSrc} />
                        )}
                    </>
                    : <p className="cart-empty">Empty Cart</p>
                }
            </div>
        );
    }
}

export default Cart;
