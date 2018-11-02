module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("userTable", {
      name: DataTypes.STRING,
    });
    return Users;
  };