module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("cartTable", {
      name: DataTypes.STRING,
    });
    return Cart;
  };