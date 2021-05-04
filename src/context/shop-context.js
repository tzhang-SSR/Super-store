import React from 'react';

export default React.createContext({
    products: [
        {id: 'p1', title: 'yooooo', price: 20.5}
    ],
    cart: [],
    addProdutToCart: product => {},
    removeProductfromCart: productId => {}
})