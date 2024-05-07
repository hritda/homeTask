const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Todo schema
const todoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    }
});

// Create Todo model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;