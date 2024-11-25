const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const noteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    taskId: {
        type: ObjectId,
        ref: 'Task',
        required: true
    }
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('Note', noteSchema);