const express = require("express");
const router = express.Router();
const Joi = require("joi");

const validateRequest = require("../../helpers/validate-request");

const userService = require("./user.service");

router.post("/register", registerSchema, register);
router.post("/login", loginSchema, login);

function registerSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required().min(3),
    password: Joi.string().required().min(8),
    email: Joi.string().required().min(8),
  });
  validateRequest(req, res, next, schema);
}

function register(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  userService
    .register(username, password, email)
    .then((resp) => res.json(resp))
    .catch(next);
}

function loginSchema(req, res, next) {
  const schema = Joi.object({
    password: Joi.string().required().min(8),
    email: Joi.string().required().min(8),
  });
  validateRequest(req, res, next, schema);
}

function login(req, res, next) {
  const password = req.body.password;
  const email = req.body.email;
  userService
    .login(email, password)
    .then((resp) => res.json(resp))
    .catch(next);
}

module.exports = router;
