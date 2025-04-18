const db = require('../models');
const Product = db.Product;
const Category = db.Category;
const { Op } = db.Sequelize;

// Create a new product
exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all products with advanced filtering
exports.findAll = async (req, res) => {
  try {
    const { 
      category, 
      categoryId, 
      isOnSale, 
      newArrival,
      minPrice,
      maxPrice,
      sort = 'newest',
      page = 1,
      limit = 10
    } = req.query;
    
    // Build conditions
    const condition = {};
    
    // Filter by string category (backward compatibility)
    if (category) {
      condition.categoryName = category;
    }
    
    // Filter by category ID (new relationship)
    if (categoryId) {
      condition.categoryId = categoryId;
    }
    
    // Filter by sale status
    if (isOnSale === 'true') {
      condition.isOnSale = true;
    }
    
    // Filter by new arrival status
    if (newArrival === 'true') {
      condition.newArrival = true;
    }
    
    // Price range filter
    if (minPrice) {
      condition.price = {
        ...condition.price,
        [Op.gte]: parseFloat(minPrice)
      };
    }
    
    if (maxPrice) {
      condition.price = {
        ...condition.price,
        [Op.lte]: parseFloat(maxPrice)
      };
    }
    
    // Pagination options
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const offset = (pageInt - 1) * limitInt;
    
    // Sorting options
    let order;
    switch (sort) {
      case 'price-low-high':
        order = [['price', 'ASC']];
        break;
      case 'price-high-low':
        order = [['price', 'DESC']];
        break;
      case 'oldest':
        order = [['createdAt', 'ASC']];
        break;
      case 'newest':
      default:
        order = [['createdAt', 'DESC']];
    }
    
    // Find products with conditions
    const { rows: products, count: totalProducts } = await Product.findAndCountAll({
      where: condition,
      order,
      limit: limitInt,
      offset,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'icon', 'bgColor'],
          required: false
        }
      ]
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limitInt);
    
    return res.status(200).json({
      products,
      pagination: {
        totalItems: totalProducts,
        totalPages,
        currentPage: pageInt,
        itemsPerPage: limitInt
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a product by id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'icon', 'bgColor'],
          required: false
        }
      ]
    });
    
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
    
    const updatedProduct = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'icon', 'bgColor'],
          required: false
        }
      ]
    });
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