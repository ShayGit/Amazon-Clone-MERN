import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import data from "../data.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

const userRoutes = express.Router();

userRoutes.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
      //await User.deleteMany({});
      const createdUsers = await User.insertMany(data.users);
      res.send({ createdUsers });
  })
);

userRoutes.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({email: req.body.email});
      if(user)
      {
        if(bcrypt.compareSync(req.body.password, user.password)){
          res.send({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)

          });
          return;
        }
      }
      res.status(401).send({message: 'Invalid email or password'})
      res.send({ createdUsers });
  })
);

export default userRoutes;
