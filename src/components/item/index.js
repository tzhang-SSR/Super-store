import React, { Component } from 'react';

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
        this.setState({ itemdata }, () => {console.log(itemdata)})
    }


    render() {
        const {avgRating, description, imageUrl, name, price, stockCount, isOnSale} = this.state.itemdata
        return (
            <div>
                This is the item page id : 
            </div>
        );
    }
}

export default Item;