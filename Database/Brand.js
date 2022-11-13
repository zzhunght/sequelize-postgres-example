const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Brand', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4

    },
    brand: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Brand',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Brand_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
