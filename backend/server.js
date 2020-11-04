import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
