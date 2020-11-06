import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, purchaseHistoryReducer } from "./reducers/orderReducer";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { userDetailsReducer, userSigninReducer, userSignupReducer } from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
    summary: {}
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  purchaseHistory: purchaseHistoryReducer,
  userDetails: userDetailsReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
