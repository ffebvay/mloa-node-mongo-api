const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const schema = new Schema({
    // NEW: Email handler
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

    // NEW: Class system
    job: { type: String, enum: ['sans', 'esthetique', 'agriculture', 'transport', 'restauration', 'commerce', 'tourisme', 'batiment'], default: 'sans', required: true },
    jobLevel: { type: Number, default: 1, min: 1 },
    currentExp: { type: Number, default: 0, min: 0 },

    // NEW: Avatar characteristics
    genre: { type: String, default: 'masculin' },
    hairColor: { type: String, default: 'brun' },

    completedTasks: { type: Number, default: 0, min: 0 },
    isVerified: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    flags: {
        welcomed: { type: Boolean, default: false }
    }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);