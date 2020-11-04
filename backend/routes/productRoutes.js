import Product from "../models/productModel.js";
import data from "../data.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";

const productRoutes = express.Router();

productRoutes.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await User.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRoutes.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRoutes.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.send(product);
    else {
      res.status(404).send({ message: "Product not found" });
    }
    res.send(products);
  })
);

export default productRoutes;
