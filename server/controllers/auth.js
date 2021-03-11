const User = require("../sequelize/models").User;
const { hash, compare } = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require("../util/auth");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Error en el formulario. Intente nuevamente.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const error = new Error("Tu e-mail o contraseña son incorrectos.");
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Tu e-mail o contraseña son incorrectos.");
      error.statusCode = 401;
      throw error;
    }

    // Login successful
    // Send refresh token as a cookie with
    // a different secret and longer expiration
    sendRefreshToken(res, createRefreshToken(user));

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken: createAccessToken(user),
      message: `User ${user.name} logged in.`,
    });
  } catch (error) {
    // if error.statusCode was not set either because of
    // 1 -> user was not found, or
    // 2 -> password didn't match with the encrypted one
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies.jid;

  if (!token) {
    return res.status(401).json({
      message: "token not sent in cookie",
      accessToken: "",
      user: null,
    });
  }

  let payload = null;

  // verify that the refresh token has not expired and is valid
  // if accessToken was sent, verify fails because it has a different secret
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "refresh token expired or invalid",
      accessToken: "",
      user: null,
    });
  }

  // token is valid and we can send back an accessToken
  const user = await User.findOne({ where: { id: payload.userId } });

  // if user does not exist, do not send any token
  if (!user) {
    return res
      .status(404)
      .json({ message: "user does not exist", accessToken: "", user: null });
  }

  // if the current user's tokenVersion is different
  // from the payload's tokenVersion (sent in the cookie)
  // do not send any token
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.status(401).json({
      message: "different token version",
      accessToken: "",
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
      },
    });
  }

  // if user exists, send new refreshToken
  // this handles the case in which the original refreshToken has expired
  sendRefreshToken(res, createRefreshToken(user));

  // if user exists, send new accessToken
  return res.json({
    ok: true,
    accessToken: createAccessToken(user),
    user: {
      name: user.name,
      id: user.id,
      email: user.email,
    },
  });
};

exports.authenticated = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  let decodedToken;

  if (!authHeader) {
    return res.json(null);
  }

  try {
    const token = authHeader.split(" ")[1];
    decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    error.statusCode = 401;
    error.message = "Access token expirado";
    throw error;
  }

  const user = await User.findOne({
    where: { id: decodedToken.userId },
  });

  if (!user) {
    return res.json(null);
  }

  res.json({ email: user.email, id: user.id, name: user.name });
};

exports.logout = (_req, res) => {
  sendRefreshToken(res, "");
  res.json("logged out");
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.destroy({ where: { id } });

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.json();
  } catch (error) {
    next(error);
  }
};

exports.revokeRefreshTokensForUser = async (_req, res) => {
  try {
    await User.increment({ tokenVersion: 1 }, { where: { id: 1 } });
  } catch (error) {
    console.log(error);
  }

  res.send(true);
};
