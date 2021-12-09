const express = require("express");
const router = express.Router();
const Joi = require("joi");

const validateRequest = require("../../helpers/validate-request");
const authenticate = require("../../helpers/authenticate");

const taskService = require("./task.service");

router.all("/*", authenticate);

router.get("/", getAllTasks);
router.get("/:id", getTask);
router.post("/", addTaskSchema, addTask);
router.delete("/:id", deleteTask);
router.put("/:id/done", markTaskAsDone);
router.put("/:id", updateTaskSchema, updateTask);

function getAllTasks(req, res, next) {
  const userID = req.user?.id;
  taskService
    .getAllTasks(userID)
    .then((tasks) => res.json(tasks))
    .catch(next);
}

function getTask(req, res, next) {
  const userID = req.user?.id;
  const taskID = req.params.id;
  taskService
    .getTask(userID, taskID)
    .then((task) => res.json(task))
    .catch(next);
}

function addTaskSchema(req, res, next) {
  const schema = Joi.object({
    description: Joi.string().required().min(3),
  });
  validateRequest(req, res, next, schema);
}

function addTask(req, res, next) {
  const userID = req.user?.id;
  const description = req.body.description;
  taskService
    .addTask(userID, description)
    .then((task) => res.json(task))
    .catch(next);
}

function deleteTask(req, res, next) {
  const userID = req.user?.id;
  const taskID = req.params.id;
  taskService
    .deleteTask(userID, taskID)
    .then(() => res.sendStatus(200))
    .catch(next);
}

function markTaskAsDone(req, res, next) {
  const userID = req.user?.id;
  const taskID = req.params.id;
  taskService
    .markTaskAsDone(userID, taskID)
    .then((task) => res.json(task))
    .catch(next);
}

function updateTaskSchema(req, res, next) {
  const schema = Joi.object({
    description: Joi.string().required().min(3),
  });
  validateRequest(req, res, next, schema);
}

function updateTask(req, res, next) {
  const userID = req.user?.id;
  const taskID = req.params.id;
  const description = req.body.description;
  taskService
    .updateTask(userID, taskID, description)
    .then((task) => res.json(task))
    .catch(next);
}

module.exports = router;
