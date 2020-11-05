import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { createOrder } from "../actions/orderActions";
import { setCartSummary } from "../actions/cartActions";

export default function PlaceOrderScreen(props) {
    const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const { cartItems } = cart;
  if (!cartItems.length) {
    props.history.push("/cart");
  }
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin?redirect=placeorder");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  
  useEffect(() => {
    if(success){
        props.history.push(`/order/${order._id}`);
        dispatch({type: ORDER_CREATE_RESET});
    }
  },[dispatch, order, props.history, success])

 

  const toPrice = (num) => Number(num.toFixed(2));

  const { summary } = cart;
 
  useEffect(() => {
    if (!summary.totalPrice) {
      const itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
      );
      const shippingPrice = itemsPrice > 100 ? toPrice(0) : toPrice(10);
      const taxPrice = toPrice(0.15 * itemsPrice);
      const totalPrice = itemsPrice + shippingPrice + taxPrice;
      dispatch(
        setCartSummary({ itemsPrice, shippingPrice, taxPrice, totalPrice })
      );
    }
  }, [cart.cartItems, cart.summary, dispatch, summary]);

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>

                <p>
                  <strong> Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong> Address:</strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong> Method:</strong> {cart.paymentMethod} <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2> Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${summary.itemsPrice?.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${summary.shippingPrice?.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${summary.taxPrice?.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${summary.totalPrice?.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox/>}
              {error && <MessageBox variant='danger'>{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
