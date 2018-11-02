module.exports = function (sequelize, DataTypes) {
  var RecipeTable = sequelize.define("RecipeTable", {
    name: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });
  return RecipeTable;
};