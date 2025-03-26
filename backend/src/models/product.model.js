module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  return Product;
};