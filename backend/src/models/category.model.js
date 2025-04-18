module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      index: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bgColor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      index: true
    }
  }, {
    indexes: [
      {
        name: 'category_name_active_idx',
        fields: ['name', 'active']
      }
    ]
  });

  return Category;
}; 