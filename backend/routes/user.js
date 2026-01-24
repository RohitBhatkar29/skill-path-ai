const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Assessment = require('../models/Assessment');

// @route   GET api/user/profile/:id
// @desc    Get user profile by ID
// @access  Public (for now)
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Get latest assessment for skills
        const assessment = await Assessment.findOne({ userId: user.id }).sort({ submittedAt: -1 });

        res.json({
            ...user.toObject(),
            skills: assessment ? assessment.skills : []
        });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   PUT api/user/profile/:id
// @desc    Update user profile
// @access  Public (for now)
router.put('/profile/:id', async (req, res) => {
    const { name, bio, location, jobTitle } = req.body;

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (jobTitle) profileFields.jobTitle = jobTitle;

    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
