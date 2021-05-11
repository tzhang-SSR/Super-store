import ShopContext from '../../context/shop-context'
import React, { Component } from 'react';
import './cart.css';
import default_img from '../../img/product-default-img.jpg';
import { Link } from 'react-router-dom';

const ItemCard = ({ item, removeProduct, editProductCount, isFirst }) => {
    let { name, imageUrl, quantity, price, productID, stockCount } = item
    return (
        <div className="cartItem" id={isFirst ? 'cartItem_first' : ''}>
            <div className="itemContent">
                <img src={imageUrl} onError={e => e.target.src = default_img} alt={name} />
                <div className="text">
                    <div className="text-name">
                        <b>{name}</b>
                    </div>
                    <div>
                        <span>Quantity: </span>
                        <input type="number" className="text-quantityBlock"
                            min="0" max={stockCount}
                            value={quantity}
                            onChange={e => {
                                editProductCount(productID, e.target.value)
                            }}
                        />
                        <span className="text-remove" onClick={() => removeProduct(productID)}>Remove</span>
                    </div>
                </div>
            </div>
            <p className="itemPrice"><b>${price.toFixed(2)}</b></p>
        </div>)
}

class Cart extends Component {
    static contextType = ShopContext

    render() {
        const { cart } = this.context
        const totalPrice = cart.reduce((count, curItem) =>
            count + parseInt(curItem.quantity) * parseFloat(curItem.price), 0)
        return (
            <div className="cart">
                { cart.length
                    ? <>
                        <div className="cart-title">Shopping Cart</div>
                        {cart.map((item, index) =>
                            <ItemCard
                                isFirst={index == 0}
                                item={item}
                                key={index}
                                addDefaultSrc={this.addDefaultSrc}
                                removeProduct={this.context.removeProduct}
                                editProductCount={this.context.editProductCount} />
                        )}
                        <div className="cart-checkout">
                            <Link to="/checkout" onClick={() => this.context.clearCart()}>
                                <button id="checkout">Checkout</button>
                            </Link>
                            <div className="totalprice">
                                <b>
                                    Total: ${totalPrice.toFixed(2)}
                                </b>
                            </div>
                        </div>
                    </>
                    : <p className="cart-empty">Empty Cart</p>
                }
            </div>
        );
    }
}

export default Cart;
