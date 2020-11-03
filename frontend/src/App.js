import { BrowserRouter, Link, Route } from "react-router-dom";

import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import React from "react";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Amazon Clone
            </Link>
          </div>
          <div >
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">Signin</Link>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center">All Rights Reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
