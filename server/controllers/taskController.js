const { taskModel, userModel } = require('../models');

function createTask(req, res, next) {
  const { title, description, dueDate, priority, status } = req.body;
  const { _id: userId } = req.user;

  taskModel.create({ title, description, dueDate, priority, status, userId })
    .then(task => {
      return userModel.findByIdAndUpdate(
        userId,
        { $push: { tasks: task._id } },
        { new: true }
      )
        .then(() => task);
    })
    .then(newlyCreatedTask => {
      res.json(newlyCreatedTask);
    })
    .catch(next);
}

function getTasks(req, res, next) {
  taskModel.find()
    .populate('userId', 'username')
    .then(tasks => res.json(tasks))
    .catch(next);
}

function getOneTask(req, res, next) {
  const { taskId } = req.params;

  taskModel.findById(taskId)
    .populate('userId', 'username')
    .then(task => res.json(task))
    .catch(next);
}

function editTask(req, res, next) {
  const { taskId } = req.params;
  const { title, description, dueDate, priority, status } = req.body;

  taskModel.findByIdAndUpdate(taskId, { title, description, dueDate, priority, status }, { new: true })
    .then(updatedTask => res.json(updatedTask))
    .catch(next);
}

function deleteTask(req, res, next) {
  const { taskId } = req.params;

  taskModel.findByIdAndDelete(taskId)
    .then(deletedTask => res.json(deletedTask))
    .catch(next);
}

module.exports = {
  getTasks,
  createTask,
  getOneTask,
  editTask,
  deleteTask
};