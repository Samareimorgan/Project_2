module.exports = function(sequelize, DataTypes) {
    var UsersTable = sequelize.define("UsersTable", {
      userName: DataTypes.STRING,
    });

    UsersTable.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      UsersTable.hasMany(models.RecipeTable, {
        onDelete: "cascade"
      });
    };
  
    return UsersTable;
  };