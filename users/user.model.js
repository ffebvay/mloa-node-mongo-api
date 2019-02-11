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

    // NEW: Avatar characteristics
    genre: { type: String, default: 'MAN' },
    hairColor: { type: String, default: 'BROWN' },
    skinColor: { type: String, default: 'COFFEE' },

    completedTasks: { type: Number, default: 0, min: 0 },
    isVerified: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    flags: {
        welcomed: { type: Boolean, default: false }
    },

    // NEW: Additional information
    info: {
        advisorFirstName: { type: String, default: '' },
        advisorLastName: { type: String, default: '' },
        advisorEmail: {
            type: String,
            default: '',
            validate: (value) => {
                return validator.isEmail(value);
            }
        },
        advisorPhone: {
            default: '',
            type: String,
            validate: (value) => {
                return validator.isMobilePhone(value, 'fr-FR');
            }
        }
    }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);