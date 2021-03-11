const Category = require("../sequelize/models").Category;

exports.getCategories = async (req, res, next) => {
  const categories = await Category.findAll({
    attributes: ["id", "slug", "name"],
  });
  res.json({ categories });
};
