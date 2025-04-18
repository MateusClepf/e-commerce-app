const db = require('../models');
const Deal = db.Deal;
const { Op } = db.Sequelize;

// Create and Save a new Deal
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.title) {
      return res.status(400).json({ 
        message: "Deal title is required" 
      });
    }

    // Create deal
    const deal = {
      title: req.body.title,
      description: req.body.description,
      bannerText: req.body.bannerText,
      imageUrl: req.body.imageUrl,
      targetUrl: req.body.targetUrl,
      discountPercentage: req.body.discountPercentage,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: req.body.active !== undefined ? req.body.active : true,
      position: req.body.position || 0
    };

    // Save in the database
    const data = await Deal.create(deal);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Deal."
    });
  }
};

// Retrieve all Deals from the database
exports.findAll = async (req, res) => {
  try {
    const { title, active } = req.query;
    let condition = {};
    
    if (title) {
      condition.title = { [Op.iLike]: `%${title}%` };
    }
    
    if (active !== undefined) {
      condition.active = active === 'true';
    }

    const data = await Deal.findAll({ 
      where: condition,
      order: [['position', 'ASC']]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving deals."
    });
  }
};

// Find a single Deal with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Deal.findByPk(id);
    
    if (!data) {
      return res.status(404).json({ 
        message: `Deal with id=${id} not found` 
      });
    }
    
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error retrieving Deal with id=${req.params.id}`
    });
  }
};

// Update a Deal by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [num] = await Deal.update(req.body, {
      where: { id: id }
    });
    
    if (num === 1) {
      res.json({
        message: "Deal was updated successfully."
      });
    } else {
      res.status(404).json({
        message: `Cannot update Deal with id=${id}. Maybe Deal was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error updating Deal with id=${req.params.id}`
    });
  }
};

// Delete a Deal with the specified id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Deal.destroy({
      where: { id: id }
    });
    
    if (num === 1) {
      res.json({
        message: "Deal was deleted successfully!"
      });
    } else {
      res.status(404).json({
        message: `Cannot delete Deal with id=${id}. Maybe Deal was not found!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Could not delete Deal with id=${req.params.id}`
    });
  }
};

// Find all active and current Deals
exports.findAllActive = async (req, res) => {
  try {
    const currentDate = new Date();
    const data = await Deal.findAll({ 
      where: { 
        active: true,
        [Op.and]: [
          {
            [Op.or]: [
              { startDate: null },
              { startDate: { [Op.lte]: currentDate } }
            ]
          },
          {
            [Op.or]: [
              { endDate: null },
              { endDate: { [Op.gte]: currentDate } }
            ]
          }
        ]
      },
      order: [['position', 'ASC']]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving active deals."
    });
  }
}; 