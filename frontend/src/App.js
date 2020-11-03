import {BrowserRouter, Route} from 'react-router-dom'

import CartScreen from './screens/CartScreen';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Amazon Clone
            </a>
          </div>
          <div>
            <a href="/cart">cart</a>
            <a href="/signin">signin</a>
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
