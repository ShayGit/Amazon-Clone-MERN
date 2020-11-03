import data from './data.js';
import express from 'express';
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js';

const app = express();
mongoose.connect(process.env.MONGOURI || 'mongodb+srv://admin:KcsPiz15r6MHUXsz@cluster0.oezaw.mongodb.net/amazonclone?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', ()=> {
    console.log('connected to mongo');
})

mongoose.connection.on('error', (err)=> {
    console.log('error connecting',err);
})

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


app.use('/api/users', userRoutes);


app.use((err,req,res,next)=>{
    res.status(500).send({message: err.message})
});

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Serve at http://localhost:${port}`);
});