const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cart', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4

    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Cart',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Cart_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
