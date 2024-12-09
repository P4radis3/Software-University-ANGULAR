const { notesModel, taskModel } = require('../models');

function addNote(req, res, next) {
    const { taskId } = req.params;
    const { text } = req.body;
    const { _id: userId } = req.user;
    notesModel.create({ text, userId, task: taskId })
        .then(note => {
            return taskModel.findByIdAndUpdate(
                taskId,
                { $push: { notes: note._id } },
                { new: true }
            )
                .populate([
                    {
                        path: 'notes'
                    },
                ])
        })
        .then(task => {
            res.json(task);
        })
        .catch(next)
}

function getNotes(req, res, next) {
    const { taskId } = req.params;
    
    notesModel.find({ task: taskId })
        .populate([
            {
                path: 'userId',
                select: ['-password', '-email', '-tasks']
            }
        ])
        .then(notes => res.json(notes))
        .catch(next);
}

module.exports = {
    addNote,
    getNotes
}