const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4

    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    BrandId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Brand',
        key: 'id'
      }
    },
    CategoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Products',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Products_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
