const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('../tasks/task.model');
const taskSchema = mongoose.model('Task').schema;

// NEW: Adding activities (quests rendered as a list of tasks + reward when all tasks are completed)
const schema = new Schema({
    userId: { type: String, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    achieved: { type: Boolean, default: false },
    reward: { type: Number, default: 0, min: 0, required: true },
    createdDate: { type: Date, default: Date.now },

    // NEW: List of tasks to accomplish
    tasks: [
        taskSchema
    ]
});

schema.set('versionKey', false);
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Activity', schema);