const db = require('../models');
const Coupon = db.Coupon;
const { Op } = db.Sequelize;

// Create and Save a new Coupon
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.code) {
      return res.status(400).json({ 
        message: "Coupon code is required" 
      });
    }

    if (!req.body.discount) {
      return res.status(400).json({ 
        message: "Discount amount is required" 
      });
    }

    if (!req.body.type || !['percentage', 'fixed'].includes(req.body.type)) {
      return res.status(400).json({ 
        message: "Valid discount type (percentage or fixed) is required" 
      });
    }

    // Create coupon
    const coupon = {
      code: req.body.code.toUpperCase(),
      discount: req.body.discount,
      type: req.body.type,
      maxDiscount: req.body.maxDiscount,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: req.body.active !== undefined ? req.body.active : true,
      usageLimit: req.body.usageLimit,
      minimumPurchase: req.body.minimumPurchase
    };

    // Save in the database
    const data = await Coupon.create(coupon);
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: "Coupon code already exists"
      });
    }
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Coupon."
    });
  }
};

// Retrieve all Coupons from the database (admin only)
exports.findAll = async (req, res) => {
  try {
    const { code, active } = req.query;
    let condition = {};
    
    if (code) {
      condition.code = { [Op.iLike]: `%${code}%` };
    }
    
    if (active !== undefined) {
      condition.active = active === 'true';
    }

    const data = await Coupon.findAll({ where: condition });
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving coupons."
    });
  }
};

// Find a single Coupon with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Coupon.findByPk(id);
    
    if (!data) {
      return res.status(404).json({ 
        message: `Coupon with id=${id} not found` 
      });
    }
    
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error retrieving Coupon with id=${req.params.id}`
    });
  }
};

// Update a Coupon by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [num] = await Coupon.update(req.body, {
      where: { id: id }
    });
    
    if (num === 1) {
      res.json({
        message: "Coupon was updated successfully."
      });
    } else {
      res.status(404).json({
        message: `Cannot update Coupon with id=${id}. Maybe Coupon was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error updating Coupon with id=${req.params.id}`
    });
  }
};

// Delete a Coupon with the specified id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Coupon.destroy({
      where: { id: id }
    });
    
    if (num === 1) {
      res.json({
        message: "Coupon was deleted successfully!"
      });
    } else {
      res.status(404).json({
        message: `Cannot delete Coupon with id=${id}. Maybe Coupon was not found!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Could not delete Coupon with id=${req.params.id}`
    });
  }
};

// Validate a coupon code (public endpoint)
exports.validateCoupon = async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const currentDate = new Date();
    
    const coupon = await Coupon.findOne({
      where: {
        code: code,
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
      }
    });
    
    if (!coupon) {
      return res.status(404).json({ 
        valid: false,
        message: "Invalid coupon code or coupon has expired" 
      });
    }
    
    // Return coupon details for valid coupon
    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        discount: parseFloat(coupon.discount),
        type: coupon.type,
        maxDiscount: coupon.maxDiscount ? parseFloat(coupon.maxDiscount) : null,
        minimumPurchase: coupon.minimumPurchase ? parseFloat(coupon.minimumPurchase) : 0
      }
    });
  } catch (err) {
    res.status(500).json({
      valid: false,
      message: err.message || "Error validating coupon code"
    });
  }
}; 