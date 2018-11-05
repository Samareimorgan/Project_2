module.exports = function (sequelize, DataTypes) {
  var RecipeTable = sequelize.define("RecipeTable", {
    recipeName: DataTypes.STRING,
    recipeImage: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  });

  RecipeTable.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    RecipeTable.belongsTo(models.UsersTable, {
      foreignKey: {
        allowNull: false
      }
    });
    RecipeTable.hasMany(models.CartTable, {
      onDelete: "cascade"
    });
  };
  return RecipeTable;
};