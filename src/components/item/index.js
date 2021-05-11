import React, { Component } from 'react';
import './item.css';
import Review from '../reviewStar/review';
import default_img from '../../img/product-default-img.jpg';
import ShopContext from '../../context/shop-context';

const url = 'https://gp-super-store-api.herokuapp.com/item/'

class Item extends Component {
    state = {
        itemdata: [],
        quantity: 1,
        isInvalid: false,
        isInsufficient: false
    }

    static contextType = ShopContext

    componentDidMount = () => {
        this.getItems()
    }

    getItems = async function () {
        const itemId = this.props.match.params.itemId
        let response = await fetch(url + itemId)
        let itemdata = await response.json()
        this.setState({ itemdata })
    }

    getCartQuantity = () => {
        const productID = this.props.match.params.itemId
        let productIndex = this.context.cart.findIndex(item => item.productID == productID)
        return productIndex >= 0 ? this.context.cart[productIndex].quantity : 0
    }

    addDefaultSrc = (e) => {
        e.target.src = default_img
    }

    handleChange = (e) => {
        const quantity = parseInt(e.target.value)
        const isInvalid = quantity <= 0
        this.setState({ quantity, isInvalid })
    }

    handleSubmit = (cartItem) => {
        const cartQuantity = this.getCartQuantity()
        const isInsufficient = this.state.quantity + cartQuantity > this.state.itemdata.stockCount
        if (isInsufficient) {
            this.setState({ isInsufficient })
        } else {
            alert(`${cartItem.name} x ${this.state.quantity} has been added to your cart!`)
            this.context.addProdutToCart(cartItem)
        }
    }

    render() {
        const { avgRating, description, imageUrl, name, price, stockCount } = this.state.itemdata
        const { quantity, isInvalid, isInsufficient } = this.state
        const cartItem = {
            name,
            price,
            quantity,
            imageUrl,
            stockCount,
            productID: this.props.match.params.itemId
        }

        return (
            <div className="item-container">
                <div className="itemImg">
                    <img onError={this.addDefaultSrc} src={imageUrl} alt={`cover of ${name}`} />
                </div>
                <div className="itemText">
                    <h1>{name}</h1>
                    {avgRating >= 0 && <Review score={avgRating} />}
                    <hr />
                    <p className="intro">{description}</p>
                    <div className="price"><strong>${price}</strong></div>
                    <div>Quantity:  &nbsp;
                        <input type="number" className="num-bg" min="1" max={stockCount} value={quantity} onChange={this.handleChange} />
                        {isInvalid && <span className="invalidTag"><strong>   Invalid Value!</strong></span>}
                    </div>
                    <div className="add-btn" onClick={() => this.handleSubmit(cartItem)}>Add to Cart</div>
                    {isInsufficient && <div className="insuffTag">Insufficient Stock!</div>}
                </div>
            </div>
        );
    }
}

export default Item;