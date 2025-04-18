const { Sequelize } = require('sequelize');
const dbConfig = require('../../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./user.model')(sequelize, Sequelize);
db.Product = require('./product.model')(sequelize, Sequelize);
db.Order = require('./order.model')(sequelize, Sequelize);
db.OrderItem = require('./orderItem.model')(sequelize, Sequelize);
// New models
db.Category = require('./category.model')(sequelize, Sequelize);
db.Deal = require('./deal.model')(sequelize, Sequelize);
db.Coupon = require('./coupon.model')(sequelize, Sequelize);

// Associations
db.Order.belongsTo(db.User, { foreignKey: 'userId' });
db.User.hasMany(db.Order, { foreignKey: 'userId' });

db.OrderItem.belongsTo(db.Order, { foreignKey: 'orderId' });
db.Order.hasMany(db.OrderItem, { foreignKey: 'orderId' });

db.OrderItem.belongsTo(db.Product, { foreignKey: 'productId' });
db.Product.hasMany(db.OrderItem, { foreignKey: 'productId' });

// New association: Category has many Products
db.Category.hasMany(db.Product, { foreignKey: 'categoryId', as: 'products' });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = db;