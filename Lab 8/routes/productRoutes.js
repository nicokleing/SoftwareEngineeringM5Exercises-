// routes/productRoutes.js
const express = require('express');
const { getProducts, getProductById } = require('../lib/api');
const logMessage = require('../lib/logger');  // Importar el logger

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    const products = await getProducts(category);
    logMessage('getProducts', 'Success');  // Registrar el mensaje
    res.json(products);
  } catch (error) {
    logMessage('getProducts', error.message);  // Registrar el error
    res.status(500).json({ error: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    logMessage(`getProductById:${id}`, 'Success');  // Registrar el mensaje
    res.json(product);
  } catch (error) {
    logMessage(`getProductById:${id}`, error.message);  // Registrar el error
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
