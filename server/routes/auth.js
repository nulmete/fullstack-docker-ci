const express = require("express");
const { body } = require("express-validator");
const User = require("../sequelize/models").User;
const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  // Validation
  [
    body("email")
      .isEmail()
      .withMessage("Ingrese una dirección de correo electrónico válida.")
      .custom((value) => {
        // Check if e-mail is already registered
        return User.findOne({ where: { email: value } }).then((user) => {
          // User exists
          if (user) {
            return Promise.reject(
              "La dirección de correo electrónico ya está en uso."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/)
      .withMessage(
        "La contraseña debe tener como mínimo 5 caracteres, incluyendo al menos una mayúscula y un número."
      ),
    body("name").trim().not().isEmpty().withMessage("Debe ingresar un nombre."),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.post("/authenticated", authController.authenticated);

router.post("/refresh_token", authController.refreshToken);

router.post("/logout", authController.logout);

router.delete("/delete-user/:id", authController.deleteUser);

router.post(
  "/revoke_refresh_tokens",
  authController.revokeRefreshTokensForUser
);

module.exports = router;
