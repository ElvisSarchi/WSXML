/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { searchXML } = require("./metodos");
require("dotenv").config();
const morgan = require("morgan");
//use jwt for authentication
const jwt = require("jsonwebtoken");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
const protectRoutes = express.Router();
protectRoutes.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .send({ success: false, message: "Failed to authenticate token." });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});
app.post("/autenticar", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  if (user === process.env.USERWS && password === process.env.PASSWORDWS) {
    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 30,
    });
    res.send({ success: true, token });
  } else {
    res.send({ success: false, message: "Invalid credentials" });
  }
});
app.post("/getXML", protectRoutes, async (req, res) => {
  const claveAcceso = req.body.claveAcceso;
  const result = await searchXML(claveAcceso);
  res.send(result);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
