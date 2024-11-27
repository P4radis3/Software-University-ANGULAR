const { taskModel, userModel } = require('../models');

function getTasks(req, res, next) {
    taskModel.find().populate('userId').then(tasks => res.json(tasks)).catch(next);
}

function getOneTask(req, res, next) {
    const { taskId } = req.params;

    taskModel.findById(taskId)
        .populate([
            { path: 'userId', select: '-password' }, { path: 'notes' }
        ])
        .then(task => res.json(task))
        .catch(next);
}

function createTask(req, res, next) {
    const { title, description, dueDate, priority, status, taskmode } = req.body;
    const { _id: userId } = req.user;

    taskModel.create({ title, description, dueDate, priority, status, taskmode, userId })
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
        .catch(err => {
            console.error('Error creating task:', err);
            next(err);
        });
}

function deleteTask(req, res, next) {
    const { taskId } = req.params;
    const { _id: userId } = req.user;

    taskModel.findByIdAndDelete(taskId)
        .then(task => {
            return userModel.findByIdAndUpdate(
                userId,
                { $pull: { tasks: { $gte: taskId } } }
            )
                .then(() => task);
        })
        .then(deletedTask => {
            res.json(deletedTask);
        })
        .catch(next);
}

function editTask(req, res, next) {
    const { taskId } = req.params;
    const taskData = req.body;

    taskModel.findByIdAndUpdate(taskId, taskData).then(updatedTask => { res.status(200).json(updatedTask); }).catch(next);
}

function getLatestTasks(req, res, next) {
    taskModel.find().sort({ createdAt: -1 }).limit(3).then(tasks => res.json(tasks)).catch(next);
}

module.exports = {
    getTasks,
    getOneTask,
    createTask,
    deleteTask,
    editTask,
    getLatestTasks
};