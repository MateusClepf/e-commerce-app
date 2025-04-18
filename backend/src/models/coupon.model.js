module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('coupon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      },
      index: true
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    type: {
      type: DataTypes.ENUM('percentage', 'fixed'),
      allowNull: false
    },
    maxDiscount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      index: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      index: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      index: true
    },
    usageLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimumPurchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    }
  }, {
    indexes: [
      {
        name: 'coupon_code_active_dates_idx',
        fields: ['code', 'active', 'startDate', 'endDate']
      }
    ]
  });

  return Coupon;
}; 