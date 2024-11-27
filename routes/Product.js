// routes/productRoutes.js

const express = require('express');
const Product = require('../modules/schemas/ProductSchema'); // Ensure Product model path is correct


const router = express.Router();

const verifyToken = require('../middleware/middleware')
router.use(verifyToken);

// Create Product
router.post('/', async (req, res) => {
    const {user, name, description, price, Quantity, category } = req.body;
    try {
        const newProduct = new Product({ user,name, description, price, Quantity, category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Products
router.get('/:userId', async (req, res) => {
    const { userId } = req.params; 
    try {
        const products = await Product.find({user:userId}).populate('user');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Product
router.put('/:id', async (req, res) => {
    const { user,name, description, price, Quantity, category } = req.body;
    console.log(req.params)
    const updateFields = {};
  
    if (user) updateFields.user  = user;
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;
    if (Quantity) updateFields.Quantity = Quantity;
    if (category) updateFields.category = category;
    console.log(updateFields)

    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });

        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; // Export the routes for use in the main app
