const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderDetails', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4

    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Order',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OrderDetails',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "OrderDetails_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fki_orderId",
        fields: [
          { name: "orderId" },
        ]
      },
      {
        name: "fki_productId",
        fields: [
          { name: "productId" },
        ]
      },
    ]
  });
};
