import React, { Component } from 'react';
import './item.css';
import Review from '../reviewStar/review';

const url = 'https://gp-super-store-api.herokuapp.com/item/'

class Item extends Component {
    state = {
        itemdata: []
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


    render() {
        const { avgRating, description, imageUrl, name, price } = this.state.itemdata
        return (
            <div className="item-container">
                <div className="itemImg">
                    <img src={imageUrl} alt={`cover of ${name}`} />
                </div>
                <div className="itemText">
                    <h1>{name}</h1>
                    {avgRating && <Review score={avgRating} />}
                    <hr />
                    <p className="intro">{description}</p>
                    <div className="price"><strong>${price}</strong></div>
                    <div>Quantity:  &nbsp;<span className="num-bg">1</span></div>
                    <div className="add-btn">Add to Cart</div>
                </div>
            </div>
        );
    }
}

export default Item;