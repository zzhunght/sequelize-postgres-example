const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CartDetails', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4

    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Cart',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CartDetails',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "CartDetails_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fki_cartId",
        fields: [
          { name: "cartId" },
        ]
      },
    ]
  });
};
