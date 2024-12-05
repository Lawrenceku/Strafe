const dbs = require("../models");
const config = require("../config/auth.config.ts");
const User = dbs.user;

const Op = dbs.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req:any, res:any) => {
  if (!req.body.username || !req.body.email) {
    return res.status(400).send({ message: "Username and email are required." });
  }

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user:any) => {
      const token = jwt.sign(
        { id: user.id },
        config.secret,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        }
      );

      res.send({
        message: "User was registered successfully!",
        accessToken: token,
      });
    })
    .catch((err:Error) => {
      res.status(500).send({ message: err.message });
    });
};



exports.signin = (req:any, res:any) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user:any) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign(
        { id: user.id },
        config.secret,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        }
      );

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err:Error) => {
      res.status(500).send({ message: err.message });
    });
};
