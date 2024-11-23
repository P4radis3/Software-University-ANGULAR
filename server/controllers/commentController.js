const { commentModel, taskModel } = require("../models");

function addComment(req, res, next) {
    const { taskId } = req.params;
    const { text } = req.body;
    const { _id: userId } = req.user;

    commentModel.create({ text, userId, task: taskId })
        .then(comment => {
            return taskModel.findByIdAndUpdate(
                taskeId,
                { $push: { comments: comment._id } },
                { new: true }
            )
                .populate([
                    {
                        path: 'comments'
                    },
                ])
        })
        .then(task => {
            res.json(task);
        })
        .catch(next)
}

function getComments(req, res, next) {
    const { taskId } = req.params;
    
    commentModel.find({ task: task })
        .populate([
            {
                path: 'userId',
                select: ['-password', '-email', '-tasks']
            }
        ])
        .then(comments => res.json(comments))
        .catch(next);
}

module.exports = {
    addComment,
    getComments
}