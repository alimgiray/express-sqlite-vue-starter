const route = require("express").Router();

route.use("/users", require("../services/user/user.controller"));
route.use("/tasks", require("../services/task/task.controller"));

// Health check
route.get("/alive", alive);
function alive(req, res, next) {
  res.send({ msg: "alive" });
}

module.exports = route;
