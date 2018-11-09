module.exports = function (sequelize, DataTypes) {
  var RecipeTable = sequelize.define("RecipeTable", {
    recipeName: DataTypes.STRING,
    recipeImage: DataTypes.STRING,
    recipeSource: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  });

  RecipeTable.associate = function (models) {
    RecipeTable.belongsTo(models.UsersTable, {
      foreignKey: {
        allowNull: false,
      },
    });
    RecipeTable.hasMany(models.CartTable, {
      onDelete: "cascade",
    });
  };
  return RecipeTable;
};