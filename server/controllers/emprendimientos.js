const User = require("../sequelize/models").User;
const Emprendimiento = require("../sequelize/models").Business;
const { deleteFile } = require("../util/deleteFile");
const Category = require("../sequelize/models").Category;
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getEmprendimientosByCategory = async (req, res, next) => {
  try {
    const emprendimientosByCategory = await Category.findByPk(
      req.body.categoryId,
      {
        include: [
          {
            model: Emprendimiento,
            attributes: ["name", "location", "imageURL", "public_id"],
            through: { attributes: [] }, // do not include junction table
            include: {
              model: User,
              attributes: ["name"],
            },
          },
        ],
      }
    );
    res.json({ emprendimientosByCategory });
  } catch (error) {
    next(error);
  }
};

exports.getEmprendimiento = async (req, res, next) => {
  const emprendimientoId = req.params.emprendimientoId;
  try {
    const emprendimiento = await Emprendimiento.findByPk(emprendimientoId);
    res.json({ emprendimiento });
  } catch (error) {
    next(error);
  }
};

exports.getEmprendimientosByCategoryAndUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const emprendimientosByCategoryAndUser = await Emprendimiento.findAll({
      where: { UserId: req.userId },
      include: [
        { model: User, attributes: ["name"] },
        {
          model: Category,
          // do not include junction table
          through: { attributes: [] },
        },
      ],
    });
    res.json({ emprendimientosByCategoryAndUser });
  } catch (error) {
    console.log(error.response);
    next(error);
  }
};

exports.addEmprendimiento = async (req, res, next) => {
  const { name, location, categoryIds } = req.body;
  // const imageURL = req.file.path.replace('\\', '/');

  // upload image to cloudinary
  // const { url, public_id } = await cloudinary.uploader.upload(imageURL);

  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      const error = new Error("No existe el usuario.");
      error.statusCode = 404;
      throw error;
    }

    const category = await Category.findAll({ where: { id: categoryIds } });
    if (!category.length) {
      const error = new Error(
        "No existe(n) la(s) categoría(s) especificada(s)."
      );
      error.statusCode = 404;
      throw error;
    }

    const emprendimiento = await Emprendimiento.create({
      name,
      location,
      imageURL: "http://asd.com",
      public_id: "public_id",
      UserId: req.userId,
    });
    const emprendimientoWithCategory = await emprendimiento.addCategory(
      category
    );

    // include user.name in the response
    // emprendimiento.setDataValue(
    //   "user",
    //   await emprendimiento.getUser({
    //     attributes: ["name"],
    //   })
    // );

    // emprendimiento.setDataValue('category', await emprendimiento.getCategory({
    //     attributes: ['name']
    // }));

    // delete image from local server
    // await deleteFile(imageURL);

    // res.status(201).json({ emprendimiento });
    res.status(201).json({ emprendimientoWithCategory });
  } catch (error) {
    next(error);
  }
};

exports.editEmprendimiento = async (req, res, next) => {
  const emprendimientoId = req.params.emprendimientoId;
  const { name, location, categoryId } = req.body;

  try {
    const emprendimiento = await Emprendimiento.findByPk(emprendimientoId);
    emprendimiento.name = name || emprendimiento.name;
    emprendimiento.location = location || emprendimiento.location;
    emprendimiento.categoryId = categoryId || emprendimiento.categoryId;

    // if the user selected a new image
    if (req.file) {
      const imageURL = req.file.path.replace("\\", "/");

      // delete old image
      await cloudinary.uploader.destroy(emprendimiento.public_id);

      // upload new image to cloudinary
      const { url, public_id } = await cloudinary.uploader.upload(imageURL);

      // delete image from local server
      await deleteFile(imageURL);

      emprendimiento.imageURL = url;
      emprendimiento.public_id = public_id;
    }

    await emprendimiento.save();

    // include user.name in the response
    emprendimiento.setDataValue(
      "user",
      await emprendimiento.getUser({
        attributes: ["name"],
      })
    );

    res.json({ emprendimiento });
  } catch (error) {
    next(error);
  }
};

exports.deleteEmprendimiento = async (req, res, next) => {
  const emprendimientoId = req.params.emprendimientoId;

  try {
    const user = await User.findByPk(req.userId);

    const emprendimientos = await user.getEmprendimientos({
      where: { id: emprendimientoId },
    });

    if (!emprendimientos.length) {
      const error = new Error("El emprendimiento especificado no existe.");
      error.statusCode = 404;
      throw error;
    }

    const emprendimiento = emprendimientos[0];

    // delete Emprendimiento's image
    await cloudinary.uploader.destroy(emprendimiento.public_id);

    await emprendimiento.destroy();
    res.json({ emprendimiento });
  } catch (error) {
    next(error);
  }
};
