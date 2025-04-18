module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      index: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      index: true
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    categoryName: {
      type: DataTypes.STRING,
      index: true
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      },
      index: true
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      index: true
    },
    isOnSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      index: true
    },
    salePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    newArrival: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      index: true
    }
  }, {
    indexes: [
      {
        name: 'product_category_sale_idx',
        fields: ['categoryId', 'isOnSale']
      },
      {
        name: 'product_category_new_idx',
        fields: ['categoryId', 'newArrival']
      },
      {
        name: 'product_price_available_idx',
        fields: ['price', 'isAvailable']
      }
    ]
  });

  return Product;
};