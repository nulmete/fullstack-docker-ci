const express = require("express");
const emprendimientosController = require("../controllers/emprendimientos");
const isAuth = require("../middleware/auth");
const router = express.Router();

router.get(
  "/emprendimientos",
  emprendimientosController.getEmprendimientosByCategory
);
router.get(
  "/emprendimiento/:emprendimientoId",
  emprendimientosController.getEmprendimiento
);
router.get(
  "/mis-emprendimientos",
  isAuth,
  emprendimientosController.getEmprendimientosByCategoryAndUser
);
router.post(
  "/emprendimiento",
  isAuth,
  emprendimientosController.addEmprendimiento
);
router.put(
  "/emprendimiento/:emprendimientoId",
  isAuth,
  emprendimientosController.editEmprendimiento
);
router.delete(
  "/emprendimiento/:emprendimientoId",
  isAuth,
  emprendimientosController.deleteEmprendimiento
);

module.exports = router;
