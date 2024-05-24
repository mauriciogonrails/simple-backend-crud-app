const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/products.model.js');
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.send("Hello from node API Server Update")
});


app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/api/product/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// updatde a product
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);


        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatdeProduct = await Product.findById(id);
        res.status(200).json(updatdeProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


});




// delete a project


app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});






mongoose.connect("mongodb+srv://mauriciogomeslxrd:YxV42tD9WoG3wzZk@backenddb.ee263rr.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => {
        console.log("Connected failed!");
    });