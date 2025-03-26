const db = require('../models');
const bcrypt = require('bcryptjs');

const Product = db.Product;
const User = db.User;

// Seed initial admin user
const seedAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ 
      where: { email: 'admin@example.com' } 
    });
    
    if (!adminExists) {
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin'
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

// Seed example products
const seedProducts = async () => {
  try {
    // Check if products already exist
    const productCount = await Product.count();
    
    if (productCount === 0) {
      const products = [
        {
          name: 'Smartphone X',
          description: 'Latest model with high-resolution camera and long battery life.',
          price: 899.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Smartphone',
          category: 'Electronics',
          stockQuantity: 50,
          isAvailable: true
        },
        {
          name: 'Wireless Headphones',
          description: 'Premium noise-cancelling headphones with 20 hours of battery life.',
          price: 199.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Headphones',
          category: 'Electronics',
          stockQuantity: 100,
          isAvailable: true
        },
        {
          name: 'Casual T-Shirt',
          description: 'Comfortable cotton t-shirt for everyday wear.',
          price: 24.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=TShirt',
          category: 'Clothing',
          stockQuantity: 200,
          isAvailable: true
        },
        {
          name: 'Running Shoes',
          description: 'Lightweight running shoes with excellent support and cushioning.',
          price: 129.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Shoes',
          category: 'Footwear',
          stockQuantity: 75,
          isAvailable: true
        },
        {
          name: 'Stainless Steel Water Bottle',
          description: 'Eco-friendly water bottle that keeps drinks cold for 24 hours.',
          price: 34.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=WaterBottle',
          category: 'Home',
          stockQuantity: 150,
          isAvailable: true
        },
        {
          name: 'Backpack',
          description: 'Durable backpack with multiple compartments, perfect for travel.',
          price: 79.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Backpack',
          category: 'Accessories',
          stockQuantity: 80,
          isAvailable: true
        },
        {
          name: 'Smartwatch',
          description: 'Track your fitness and receive notifications with this stylish smartwatch.',
          price: 249.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Smartwatch',
          category: 'Electronics',
          stockQuantity: 30,
          isAvailable: true
        },
        {
          name: 'Coffee Maker',
          description: 'Programmable coffee maker that brews the perfect cup every time.',
          price: 89.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=CoffeeMaker',
          category: 'Home',
          stockQuantity: 40,
          isAvailable: true
        }
      ];
      
      await Product.bulkCreate(products);
      console.log(`${products.length} products seeded successfully`);
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Main seeder function
const seedDatabase = async () => {
  try {
    await seedAdminUser();
    await seedProducts();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Database seeding failed:', error);
  }
};

module.exports = seedDatabase;