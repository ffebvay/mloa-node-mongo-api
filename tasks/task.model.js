const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    grantExp: { type: Number, default: 5 },
    createdDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', schema);