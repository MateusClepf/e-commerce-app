const db = require('../models');
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;

// Create a new order (guest or authenticated)
exports.create = async (req, res) => {
  try {
    const { orderItems, ...orderData } = req.body;
    
    // Check if all items are available and calculate total
    let totalAmount = 0;
    for (const item of orderItems) {
      const product = await Product.findByPk(item.productId);
      
      if (!product) {
        return res.status(404).json({ 
          message: `Product with id ${item.productId} not found` 
        });
      }
      
      if (!product.isAvailable || product.stockQuantity < item.quantity) {
        return res.status(400).json({ 
          message: `Product ${product.name} is not available in the requested quantity` 
        });
      }
      
      // Add price to item and calculate total
      item.price = parseFloat(product.price);
      totalAmount += item.price * item.quantity;
    }
    
    // Create the order
    const order = await Order.create({
      ...orderData,
      totalAmount,
      userId: req.userId || null, // If authenticated, add userId
    });
    
    // Create order items
    for (const item of orderItems) {
      await OrderItem.create({
        ...item,
        orderId: order.id
      });
      
      // Update product stock
      const product = await Product.findByPk(item.productId);
      await product.update({
        stockQuantity: product.stockQuantity - item.quantity
      });
    }
    
    // Return the complete order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [{
        model: OrderItem,
        include: [Product]
      }]
    });
    
    return res.status(201).json(completeOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all orders for a user
exports.findAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      include: [{
        model: OrderItem,
        include: [Product]
      }]
    });
    
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get order by id
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findOne({
      where: { 
        id,
        userId: req.userId // Ensure user owns this order
      },
      include: [{
        model: OrderItem,
        include: [Product]
      }]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get order by id for guest (using email and order id)
exports.findOneGuest = async (req, res) => {
  try {
    const { id, email } = req.params;
    
    const order = await Order.findOne({
      where: { 
        id,
        guestEmail: email 
      },
      include: [{
        model: OrderItem,
        include: [Product]
      }]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};