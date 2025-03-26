module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true // Allow for guest checkout
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
      defaultValue: 'pending'
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shippingCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shippingState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shippingZipCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shippingCountry: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shippingMethod: {
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guestEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    guestPhone: {
      type: DataTypes.STRING
    }
  });

  return Order;
};