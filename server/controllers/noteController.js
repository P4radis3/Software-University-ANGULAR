const { noteModel, taskModel } = require('../models');

function addNote(req, res, next) {
    const { taskId } = req.params;
    const { text } = req.body;
    const { _id: userId } = req.user;

    noteModel.create({ text, userId, task: taskId })
        .then(note => {
            return taskModel.findByIdAndUpdate(
                taskId,
                { $push: { notes: note._id } },
                { new: true }
            ).populate('notes');
        })
        .then(task => {
            res.json(task);
        })
        .catch(next);
}

function getNotes(req, res, next) {
    const { taskId } = req.params;

    noteModel.find({ task: taskId })
        .populate('userId', '-password')
        .then(notes => res.json(notes))
        .catch(next);
}

module.exports = {
    addNote,
    getNotes
};