import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import {savePaymentMethod} from '../actions/cartActions'

export default function PaymentMethodScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!shippingAddress.address){
        props.history.push('/shipping');
    }
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    if(!userInfo)
    {
        props.history.push('/signin?redirect=payment');

    }
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder')
    }
    
  return (
    <div>
      <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method:</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="Paypal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
          </div>
          <div>
              <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
            </div>
            </div>
            <div>
              <label/>
              <button className="primary" type="submit">Continue</button>
              
        </div>
      </form>
    </div>
  );
}
