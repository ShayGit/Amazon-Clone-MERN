import User from "../models/userModel.js";
import data from "../data.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";

const userRoutes = express.Router();

userRoutes.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
      //await User.deleteMany({});
      const createdUsers = await User.insertMany(data.users);
      res.send({ createdUsers });
  })
);

export default userRoutes;
