import React, { Component } from 'react';
import './item.css';
import Review from '../reviewStar/review';
import default_img from '../../img/product-default-img.jpg';

const url = 'https://gp-super-store-api.herokuapp.com/item/'

class Item extends Component {
    state = {
        itemdata: [],
        quantity: 1,
        isInvalid: false,
        isInsufficient: false
    }
    componentDidMount() {
        this.getItems()
    }

    getItems = async function () {
        const itemId = this.props.match.params.itemId
        let response = await fetch(url + itemId)
        let itemdata = await response.json()
        this.setState({ itemdata })
    }

    addDefaultSrc = function (e) {
        e.target.src = default_img
    }

    handleChange = (e) => {
        const quantity = e.target.value
        const isInvalid = parseInt(quantity) <= 0
        const isInsufficient = parseInt(quantity) > this.state.itemdata.stockCount
        this.setState({ quantity, isInvalid, isInsufficient })
    }

    render() {
        const { avgRating, description, imageUrl, name, price } = this.state.itemdata
        const { quantity, isInvalid, isInsufficient } = this.state
        return (
            <div className="item-container">
                <div className="itemImg">
                    <img onError={this.addDefaultSrc} src={imageUrl} alt={`cover of ${name}`} />
                </div>
                <div className="itemText">
                    <h1>{name}</h1>
                    {avgRating && <Review score={avgRating} />}
                    <hr />
                    <p className="intro">{description}</p>
                    <div className="price"><strong>${price}</strong></div>
                    <div>Quantity:  &nbsp;
                        <input type="number" className="num-bg" min="1" value={quantity} onChange={this.handleChange} />
                        {isInvalid && <span className="invalidTag"><strong>   Invalid Value!</strong></span>}
                    </div>
                    <div className="add-btn">Add to Cart</div>
                    {isInsufficient && <div className="insuffTag">Insufficient Stock!</div>}
                </div>
            </div>
        );
    }
}

export default Item;