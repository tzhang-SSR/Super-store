import ShopContext from '../../context/shop-context'
import React, { Component } from 'react';
import './cart.css';
import default_img from '../../img/product-default-img.jpg';

const ItemCard = ({ item, removeProduct }) => {
    const { name, imageUrl, quantity, price, productID } = item
    return (
        <div className="cartItem">
            <div className="itemContent">
                <img src={imageUrl} onError={e => e.target.src = default_img} alt={name} />
                <div className="text">
                    <div className="text-name">
                        <b>{name}</b>
                    </div>
                    <div>
                        <span>Quantity: </span>
                        <div className="text-quantityBlock">{quantity}</div>
                        <span className="text-remove" onClick={() => removeProduct(productID)}>Remove</span>
                    </div>
                </div>
            </div>
            <p className="itemPrice"><b>${price}</b></p>
        </div>)
}

class Cart extends Component {
    static contextType = ShopContext

    componentDidMount = () => {
        // console.log(this.context)
    }

    render() {
        const { cart } = this.context
        console.log("Cart", cart)
        return (
            <div className="cart">
                { cart.length
                    ? <>
                        {cart.map((item, index) =>
                            <ItemCard item={item} key={index} 
                            addDefaultSrc={this.addDefaultSrc} 
                            removeProduct={this.context.removeProduct} />
                        )}
                    </>
                    : <p className="cart-empty">Empty Cart</p>
                }
            </div>
        );
    }
}

export default Cart;
