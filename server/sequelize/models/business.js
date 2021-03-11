"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    static associate(models) {
      Business.belongsTo(models.User);
      Business.belongsToMany(models.Category, {
        through: "BusinessCategories",
      });
    }
  }
  Business.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      imageURL: DataTypes.STRING,
      public_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Business",
    }
  );
  return Business;
};
