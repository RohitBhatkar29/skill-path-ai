const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const User = require('../models/User');

// @route   POST api/assessment
// @desc    Save assessment results
// @access  Private (Mock)
router.post('/', async (req, res) => {
    const { userId, education, skills, interests, experienceLevel, goal } = req.body;

    try {
        const assessment = new Assessment({
            userId,
            education,
            skills,
            interests,
            experienceLevel,
            goal
        });

        await assessment.save();

        // Update User to mark assessment as completed
        await User.findByIdAndUpdate(userId, { hasCompletedAssessment: true });

        res.json(assessment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
