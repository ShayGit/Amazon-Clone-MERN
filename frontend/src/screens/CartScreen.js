import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';

import { addToCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';

export default function CartScreen() {
    const params = useParams();
    const location = useLocation();
    const productId = params.id;
    const quantity = location.search? Number(location.search.split('=')[1])
    : 1;

    const dispatch = useDispatch();

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    },[quantity, productId,dispatch])
    return (
        <div>
            <h1>Cart  Screen</h1>
            <p>ADD TO CART: Product ID: {productId} Quantity: {quantity}</p>
        </div>
    )
}
