import React, { Component } from 'react';
import './home.css';
import ItemCard from './card';

const itemURL = 'https://gp-super-store-api.herokuapp.com/item/list';

class HomePage extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        this.getItems()
    }

    getItems = async function () {
        let response = await fetch(itemURL)
        let data = await response.json()
        this.setState({ items: data.items })
    }


    render() {
        const { items } = this.state
        // console.log(items)
        return (
            <div className="item-container">
                {
                    items.map((item, index) => <ItemCard key={index} {...item} />)
                }
            </div>
        );
    }
}

export default HomePage;
