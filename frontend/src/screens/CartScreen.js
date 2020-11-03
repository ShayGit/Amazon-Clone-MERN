import { useLocation, useParams } from 'react-router-dom';

import React from 'react'

export default function CartScreen() {
    const params = useParams();
    const location = useLocation();
    const productId = params.id;
    const quantity = location.search? Number(location.search.split('=')[1])
    : 1;
    return (
        <div>
            <h1>Cart  Screen</h1>
            <p>ADD TO CART: Product ID: {productId} Quantity: {quantity}</p>
        </div>
    )
}
