const db = require('../models');
const Category = db.Category;
const Product = db.Product;
const { Op } = db.Sequelize;

// Create and Save a new Category
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).json({ 
        message: "Category name is required" 
      });
    }

    // Create category
    const category = {
      name: req.body.name,
      icon: req.body.icon,
      bgColor: req.body.bgColor,
      active: req.body.active !== undefined ? req.body.active : true
    };

    // Save in the database
    const data = await Category.create(category);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Category."
    });
  }
};

// Retrieve all Categories from the database
exports.findAll = async (req, res) => {
  try {
    const { name, active } = req.query;
    let condition = {};
    
    if (name) {
      condition.name = { [Op.iLike]: `%${name}%` };
    }
    
    if (active !== undefined) {
      condition.active = active === 'true';
    }

    const data = await Category.findAll({ where: condition });
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving categories."
    });
  }
};

// Find a single Category with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products'
        }
      ]
    });
    
    if (!data) {
      return res.status(404).json({ 
        message: `Category with id=${id} not found` 
      });
    }
    
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error retrieving Category with id=${req.params.id}`
    });
  }
};

// Update a Category by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [num] = await Category.update(req.body, {
      where: { id: id }
    });
    
    if (num === 1) {
      res.json({
        message: "Category was updated successfully."
      });
    } else {
      res.status(404).json({
        message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error updating Category with id=${req.params.id}`
    });
  }
};

// Delete a Category with the specified id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Category.destroy({
      where: { id: id }
    });
    
    if (num === 1) {
      res.json({
        message: "Category was deleted successfully!"
      });
    } else {
      res.status(404).json({
        message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Could not delete Category with id=${req.params.id}`
    });
  }
};

// Find all active Categories
exports.findAllActive = async (req, res) => {
  try {
    const data = await Category.findAll({ where: { active: true } });
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving active categories."
    });
  }
}; 