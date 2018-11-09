module.exports = function (sequelize, DataTypes) {
  var CartTable = sequelize.define("CartTable", {
    Ingredients: DataTypes.STRING,
  });

  CartTable.associate = function (models) {
    CartTable.belongsTo(models.RecipeTable, {
      foreignKey: {
        allowNull: false,
      },
      constraints: false
    });
  };
  return CartTable;
};