const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - NEW: Adding checklist concept
const checkSchema = new Schema({
    completed: { type: Boolean, default: false },
    text: { type: String, required: false, default: '' }
})

const schema = new Schema({
    userId: { type: String, ref: 'User' },
    text: { type: String, required: true },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
    difficulty: {
        type: Number,
        default: 1,
        required: true,
        validate: [
            (val) => [1, 1.5, 2].indexOf(val) !== -1,
            'Valid priority values are 1, 1.5, 2.',
        ]
    },
    grantExp: { type: Number, default: 20 }, // TODO: DANGER -> make sure it doesn't give too much XP on task completion (5 is good)
    createdDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // TODO - NEW: Added checklist concept
    checklist: [
        checkSchema
    ],

    // TODO - New: Adding due/ completed dates
    dueDate: { type: Date },
    completedDate: { type: Date }
});

schema.set('versionKey', false);
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', schema);