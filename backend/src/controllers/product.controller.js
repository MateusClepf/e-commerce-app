const db = require('../models');
const Product = db.Product;

// Create a new product
exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all products
exports.findAll = async (req, res) => {
  try {
    const { category } = req.query;
    const condition = category ? { category } : null;
    
    const products = await Product.findAll({ where: condition });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a product by id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a product
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [updated] = await Product.update(req.body, {
      where: { id }
    });
    
    if (updated === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const updatedProduct = await Product.findByPk(id);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a product
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await Product.destroy({
      where: { id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};