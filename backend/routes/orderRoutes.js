import Order from "../models/orderModel.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";

const orderRoutes = express.Router();

orderRoutes.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.summary.itemsPrice,
        shippingPrice: req.body.summary.shippingPrice,
        taxPrice: req.body.summary.taxPrice,
        totalPrice: req.body.summary.totalPrice,
        user: req.user._id,
      });
      
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRoutes.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order)
    {
      res.send(order);
    }
    else{
      res.status(404).send({ message: "Order not found" });
    }
  })
);

export default orderRoutes;
