const errors = require("../../errors");

const User = require("../user/user.model");
const Task = require("./task.model");

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  deleteTask,
  markTaskAsDone,
  updateTask,
};

async function getAllTasks(userID) {
  const tasks = await Task.findAll({
    where: {},
    include: [
      {
        model: User,
        required: true,
        attributes: ["id", "username"],
        where: {
          id: userID,
        },
      },
    ],
  });
  return tasks;
}

async function getTask(userID, taskID) {
  const task = await Task.findOne({
    where: { id: taskID },
    include: [
      {
        model: User,
        required: true,
        attributes: ["id", "username"],
        where: {
          id: userID,
        },
      },
    ],
  });
  if (!task) {
    throw new errors.AppError(
      errors.errorTypes.NOT_FOUND,
      404,
      "Task not found",
      true
    );
  }
  return task;
}

async function addTask(userID, description) {
  const user = await User.findOne({ where: { id: userID } });
  if (!user) {
    throw new errors.AppError(
      errors.errorTypes.NOT_FOUND,
      404,
      "User not found",
      true
    );
  }
  const task = await Task.create({ description });
  await task.setUser(user);
  return await task.save();
}

async function deleteTask(userID, taskID) {
  const task = await getTask(userID, taskID);
  await task.destroy();
}

async function markTaskAsDone(userID, taskID) {
  const task = await getTask(userID, taskID);
  task.done = true;
  return await task.save();
}

async function updateTask(userID, taskID, description) {
  const task = await getTask(userID, taskID);
  task.description = description;
  return await task.save();
}
