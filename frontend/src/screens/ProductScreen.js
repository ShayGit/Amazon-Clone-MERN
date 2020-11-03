import { Link, useParams } from "react-router-dom";

import Rating from "../components/Rating";
import React from "react";
import data from "../data";

export default function ProductScreen() {
  const params = useParams();
  const product = data.products.find((x) => x._id === params.id);
  if (!product) {
    return <div> Product Not Found</div>;
  }
  return (
    <div>
        <Link to="/">Back to results</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li>{product.name}</li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li>Price: ${product.price}</li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div> Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div >{product.countInStock>0? <span className="success">In stock</span> :
                  <span className="danger">Unavailable</span>}</div>
                </div>
              </li>
              <li>
                <button className="primary block">
                  Add To Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
