const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    job: { type: String, enum: ['sans', 'esthetique', 'agriculture', 'transport', 'restauration', 'commerce', 'tourisme', 'batiment'], default: 'sans' },
    jobLevel: { type: Number, default: 1, min: 1 },
    exp: { type: Number, default: 0, min: 0 },
    stage: {
        type: Number,
        default: 1,
        validate: [
            (val) => [1, 2, 3, 4].indexOf(val) !== -1,
            'Valid priority values are 1, 2, 3 and 4',
        ]
    }
});

const schema = new Schema({
    // Email handler
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value);
        }
    },
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },

    // Class system
    job: { type: String, enum: ['sans', 'esthetique', 'agriculture', 'transport', 'restauration', 'commerce', 'tourisme', 'batiment'], default: 'sans' },
    jobLevel: { type: Number, default: 1, min: 1 },
    currentExp: { type: Number, default: 0, min: 0 },
    stage: {
        type: Number,
        default: 1,
        validate: [
            (val) => [1, 2, 3, 4].indexOf(val) !== -1,
            'Valid priority values are 1, 2, 3 and 4',
        ]
    }, // represents each "level" at which the user will visually evolve

    // Avatar characteristics
    genre: { type: String, default: 'MAN' },
    hairColor: { type: String, default: 'BROWN' },
    skinColor: { type: String, default: 'COFFEE' },

    completedTasks: { type: Number, default: 0, min: 0 },
    isVerified: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    flags: {
        welcomed: { type: Boolean, default: false },
        canChangeJob: { type: Boolean, default: false }
    },

    // Additional information
    info: {
        advisorFirstName: { type: String, default: '', required: false },
        advisorLastName: { type: String, default: '', required: false },
        advisorEmail: { type: String, default: '', required: false},
        advisorPhone: { type: String, default: '', required: false }
    },

    // NEW: Player stats (job, xp, stage) history
    history: [
        historySchema
    ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);