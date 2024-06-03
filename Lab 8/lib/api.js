// lib/api.js
const axios = require('axios');

const API_URL = 'https://fakestoreapi.com';

async function getProducts(category) {
  try {
    const url = category ? `${API_URL}/products/category/${category}` : `${API_URL}/products`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
}

async function getProductById(id) {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product');
  }
}

module.exports = { getProducts, getProductById };
