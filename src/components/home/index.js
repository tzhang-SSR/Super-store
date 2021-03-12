import React, { Component } from 'react';

const itemURL = 'https://gp-super-store-api.herokuapp.com/item/list';


const ItemCard = (props) => {
    const item = props.data
    return (
        <>
            {item &&
                <div>
                    <img src={item.imageUrl} alt="imgs" />
                    <p>{item.name}</p>
                    <p>{item.avgRating}</p>
                    <p>{item.price}</p>
                </div>
            }
        </>

    )
}

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
            <div>
                {/* <ItemCard data={items[0]} /> */}
                {

                    items.map((item, index) => <ItemCard key={index} data={item} />)
                }
            </div>
        );
    }
}

export default HomePage;
