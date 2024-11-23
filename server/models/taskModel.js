const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
    required: true
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }],
  userId: {
    type: ObjectId,
    ref: 'User'
  }
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('Task', taskSchema);