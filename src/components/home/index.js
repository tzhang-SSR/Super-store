import React from 'react';
import ItemCard from '../card';
import './home.css';

export default function HomePage({items}) {
    return (
        <div className="container">
            {
                items.map((item, index) => <ItemCard key={index} {...item} />)
            }
        </div>
    );
}


