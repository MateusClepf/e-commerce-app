const db = require('../models');
const bcrypt = require('bcryptjs');

const Product = db.Product;
const User = db.User;
const Category = db.Category;
const Deal = db.Deal;
const Coupon = db.Coupon;

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

// Seed categories
const seedCategories = async () => {
  try {
    // Check if categories already exist
    const categoryCount = await Category.count();
    
    if (categoryCount === 0) {
      const categories = [
        {
          name: 'Electronics',
          icon: '🖥️',
          bgColor: 'bg-blue-100',
          active: true
        },
        {
          name: 'Clothing',
          icon: '👕',
          bgColor: 'bg-green-100',
          active: true
        },
        {
          name: 'Footwear',
          icon: '👟',
          bgColor: 'bg-yellow-100',
          active: true
        },
        {
          name: 'Home',
          icon: '🏠',
          bgColor: 'bg-red-100',
          active: true
        },
        {
          name: 'Accessories',
          icon: '👜',
          bgColor: 'bg-purple-100',
          active: true
        },
        {
          name: 'Books',
          icon: '📚',
          bgColor: 'bg-indigo-100',
          active: true
        }
      ];
      
      await Category.bulkCreate(categories);
      console.log(`${categories.length} categories seeded successfully`);
    }
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

// Seed deals/promotions
const seedDeals = async () => {
  try {
    // Check if deals already exist
    const dealCount = await Deal.count();
    
    if (dealCount === 0) {
      const deals = [
        {
          title: 'Summer Sale',
          description: 'Great deals on summer items',
          bannerText: 'Up to 50% off on selected items',
          imageUrl: 'https://via.placeholder.com/1200x300?text=Summer+Sale',
          targetUrl: '/products?isOnSale=true',
          discountPercentage: 50,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          active: true,
          position: 1
        },
        {
          title: 'New Arrivals',
          description: 'Check out our newest products',
          bannerText: 'Fresh new styles just arrived',
          imageUrl: 'https://via.placeholder.com/1200x300?text=New+Arrivals',
          targetUrl: '/products?newArrival=true',
          discountPercentage: null,
          startDate: new Date(),
          endDate: null,
          active: true,
          position: 2
        }
      ];
      
      await Deal.bulkCreate(deals);
      console.log(`${deals.length} deals seeded successfully`);
    }
  } catch (error) {
    console.error('Error seeding deals:', error);
  }
};

// Seed coupons
const seedCoupons = async () => {
  try {
    // Check if coupons already exist
    const couponCount = await Coupon.count();
    
    if (couponCount === 0) {
      const coupons = [
        {
          code: 'WELCOME10',
          discount: 0.1,
          type: 'percentage',
          maxDiscount: 50,
          startDate: new Date(),
          endDate: null,
          active: true,
          usageLimit: null,
          minimumPurchase: 0
        },
        {
          code: 'SUMMER25',
          discount: 0.25,
          type: 'percentage',
          maxDiscount: 100,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          active: true,
          usageLimit: null,
          minimumPurchase: 50
        },
        {
          code: 'FREESHIP',
          discount: 10,
          type: 'fixed',
          maxDiscount: null,
          startDate: new Date(),
          endDate: null,
          active: true,
          usageLimit: 1000,
          minimumPurchase: 0
        },
        {
          code: 'FLAT20',
          discount: 20,
          type: 'fixed',
          maxDiscount: null,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          active: true,
          usageLimit: 500,
          minimumPurchase: 100
        }
      ];
      
      await Coupon.bulkCreate(coupons);
      console.log(`${coupons.length} coupons seeded successfully`);
    }
  } catch (error) {
    console.error('Error seeding coupons:', error);
  }
};

// Seed example products
const seedProducts = async () => {
  try {
    // Check if products already exist
    const productCount = await Product.count();
    
    if (productCount === 0) {
      // Get categories to link products with categoryId
      const categories = await Category.findAll();
      const categoryMap = {};
      
      // Create a map of category name to ID for easy lookup
      categories.forEach(category => {
        categoryMap[category.name] = category.id;
      });
      
      const products = [
        {
          name: 'Smartphone X',
          description: 'Latest model with high-resolution camera and long battery life.',
          price: 899.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Smartphone',
          category: 'Electronics',
          categoryId: categoryMap['Electronics'],
          stockQuantity: 50,
          isAvailable: true,
          isOnSale: true,
          salePrice: 799.99,
          newArrival: true
        },
        {
          name: 'Wireless Headphones',
          description: 'Premium noise-cancelling headphones with 20 hours of battery life.',
          price: 199.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Headphones',
          category: 'Electronics',
          categoryId: categoryMap['Electronics'],
          stockQuantity: 100,
          isAvailable: true,
          isOnSale: false,
          newArrival: false
        },
        {
          name: 'Casual T-Shirt',
          description: 'Comfortable cotton t-shirt for everyday wear.',
          price: 24.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=TShirt',
          category: 'Clothing',
          categoryId: categoryMap['Clothing'],
          stockQuantity: 200,
          isAvailable: true,
          isOnSale: true,
          salePrice: 19.99,
          newArrival: false
        },
        {
          name: 'Running Shoes',
          description: 'Lightweight running shoes with excellent support and cushioning.',
          price: 129.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Shoes',
          category: 'Footwear',
          categoryId: categoryMap['Footwear'],
          stockQuantity: 75,
          isAvailable: true,
          isOnSale: false,
          newArrival: true
        },
        {
          name: 'Stainless Steel Water Bottle',
          description: 'Eco-friendly water bottle that keeps drinks cold for 24 hours.',
          price: 34.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=WaterBottle',
          category: 'Home',
          categoryId: categoryMap['Home'],
          stockQuantity: 150,
          isAvailable: true,
          isOnSale: false,
          newArrival: false
        },
        {
          name: 'Backpack',
          description: 'Durable backpack with multiple compartments, perfect for travel.',
          price: 79.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Backpack',
          category: 'Accessories',
          categoryId: categoryMap['Accessories'],
          stockQuantity: 80,
          isAvailable: true,
          isOnSale: true,
          salePrice: 59.99,
          newArrival: false
        },
        {
          name: 'Smartwatch',
          description: 'Track your fitness and receive notifications with this stylish smartwatch.',
          price: 249.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=Smartwatch',
          category: 'Electronics',
          categoryId: categoryMap['Electronics'],
          stockQuantity: 30,
          isAvailable: true,
          isOnSale: false,
          newArrival: true
        },
        {
          name: 'Coffee Maker',
          description: 'Programmable coffee maker that brews the perfect cup every time.',
          price: 89.99,
          imageUrl: 'https://via.placeholder.com/300x300?text=CoffeeMaker',
          category: 'Home',
          categoryId: categoryMap['Home'],
          stockQuantity: 40,
          isAvailable: true,
          isOnSale: true,
          salePrice: 69.99,
          newArrival: false
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
    await seedCategories();
    await seedDeals();
    await seedCoupons();
    await seedProducts();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Database seeding failed:', error);
  }
};

module.exports = seedDatabase;