import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import orderRoutes from './routes/orderRoutes.js';
import path from 'path';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/config/paypal', (req, res) =>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const __dirname = path.resolve();

if(process.env.NODE_ENV == "production"){
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
} 

app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});
