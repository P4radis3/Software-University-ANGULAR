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
    task: {
        type: ObjectId,
        ref: 'Task',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);