module.exports = function (sequelize, DataTypes) {
  var CartTable = sequelize.define("CartTable", {
    Ingredients: DataTypes.STRING
  });

  CartTable.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    CartTable.belongsTo(models.RecipeTable, {
      foreignKey: {
        allowNull: false
      }
    });
    CartTable.belongsTo(models.UsersTable, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return CartTable;
};