module.exports = function (sequelize, DataTypes) {
  var UsersTable = sequelize.define("UsersTable", {
    userName: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  });

  UsersTable.associate = function (models) {
    UsersTable.hasMany(models.RecipeTable, {
      onDelete: "cascade",
    });
  };

  return UsersTable;
};