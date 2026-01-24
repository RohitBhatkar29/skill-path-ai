const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    education: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    interests: {
        type: [String], // Career roles e.g. Full Stack, Data Scientist
        default: []
    },
    experienceLevel: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
