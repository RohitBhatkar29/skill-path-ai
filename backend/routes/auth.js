const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password // Note: In production, hash this with bcrypt!
        });

        await user.save();

        res.json({
            token: 'mock-jwt-token-' + user.id,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                hasCompletedAssessment: user.hasCompletedAssessment
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        res.json({
            token: 'mock-jwt-token-' + user.id,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                hasCompletedAssessment: user.hasCompletedAssessment
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/google
// @desc    Google Login/Register
// @access  Public
router.post('/google', async (req, res) => {
    const { name, email, googleId } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            // User exists, log them in
            return res.json({
                token: 'mock-jwt-token-' + user.id,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    hasCompletedAssessment: user.hasCompletedAssessment
                }
            });
        }

        // User doesn't exist, create new
        user = new User({
            name,
            email,
            password: 'google-auth-user-' + googleId, // Dummy password for schema validation
            isGoogleAuth: true
        });

        await user.save();

        res.json({
            token: 'mock-jwt-token-' + user.id,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                hasCompletedAssessment: user.hasCompletedAssessment
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
