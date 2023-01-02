var DataTypes = require("sequelize").DataTypes;
var _Brand = require("./Brand");
var _Cart = require("./Cart");
var _CartDetails = require("./CartDetails");
var _Categories = require("./Categories");
var _Order = require("./Order");
var _OrderDetails = require("./OrderDetails");
var _Products = require("./Products");
var _User = require("./User");

function initModels(sequelize) {
  var Brand = _Brand(sequelize, DataTypes);
  var Cart = _Cart(sequelize, DataTypes);
  var CartDetails = _CartDetails(sequelize, DataTypes);
  var Categories = _Categories(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var OrderDetails = _OrderDetails(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Products.belongsTo(Brand, { as: "Brand", foreignKey: "BrandId"});
  Brand.hasMany(Products, { as: "Products", foreignKey: "BrandId"});
  CartDetails.belongsTo(Cart, { as: "cart", foreignKey: "cartId"});
  Cart.hasMany(CartDetails, { as: "CartDetails", foreignKey: "cartId"});
  Products.belongsTo(Categories, { as: "Category", foreignKey: "CategoryId"});
  Categories.hasMany(Products, { as: "Products", foreignKey: "CategoryId"});
  OrderDetails.belongsTo(Order, { as: "order", foreignKey: "orderId"});
  Order.hasMany(OrderDetails, { as: "OrderDetails", foreignKey: "orderId"});
  CartDetails.belongsTo(Products, { as: "product", foreignKey: "productId"});
  Products.hasMany(CartDetails, { as: "CartDetails", foreignKey: "productId"});
  OrderDetails.belongsTo(Products, { as: "product", foreignKey: "productId"});
  Products.hasMany(OrderDetails, { as: "OrderDetails", foreignKey: "productId"});
  Cart.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasOne(Cart, { as: "Carts", foreignKey: "userId"});
  Order.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(Order, { as: "Orders", foreignKey: "userId"});

  return {
    Brand,
    Cart,
    CartDetails,
    Categories,
    Order,
    OrderDetails,
    Products,
    User,
  };
}
module.exports = initModels(require('./DB'));
module.exports.initModels = initModels;
module.exports.default = initModels;
