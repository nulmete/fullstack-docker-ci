const express = require("express");
const categoriasController = require("../controllers/categorias");

const router = express.Router();

router.get("/categories", categoriasController.getCategories);

module.exports = router;
