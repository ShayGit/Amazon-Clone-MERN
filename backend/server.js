import data from './data.js';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Server is ready");
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find((x)=> x._id === productId);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: 'Product not Found'})
    }
    res.send(data.products);
});

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Serve at http://localhost:${port}`);
});