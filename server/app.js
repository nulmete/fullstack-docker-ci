const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categorias");
const businessRoutes = require("./routes/emprendimientos");

require("dotenv").config({ path: `./config/${process.env.NODE_ENV}.env` });

const app = express();
const db = require("./sequelize/models");

const origin =
  process.env.NODE_ENV === "production"
    ? "https://emprendapp.com.ar"
    : "http://localhost";

app.use(
  cors({
    origin,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// Configure multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// 'image' is the name of the html input that holds the file
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// routes
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", businessRoutes);

// Error-handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  // if statusCode is not set, set it to 500
  const status = error.statusCode || 500;
  const message = error.message;
  let validationErrors;
  if (error.data) validationErrors = error.data;
  res.status(status).json({ status, message, validationErrors });
});

// start sequelize and then api
db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Server started successfully in ${process.env.NODE_ENV} environment`
    );
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
