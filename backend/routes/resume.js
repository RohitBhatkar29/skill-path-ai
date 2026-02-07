const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Configure Multer (Memory Storage)
const upload = multer({ storage: multer.memoryStorage() });

// PROXY Route: Node.js (Port 5000) -> Python (Port 8000)
router.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No resume file uploaded" });
        }

        console.log(`Received file: ${req.file.originalname}, Size: ${req.file.size}`);

        // Prepare FormData for Python Backend
        const formData = new FormData();
        formData.append('resume_file', req.file.buffer, req.file.originalname);

        // Forward to Python Service
        const pythonServiceUrl = 'http://127.0.0.1:8000/resume-analyze'; // Ensure Python is running here
        const response = await axios.post(pythonServiceUrl, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        // Send Python's response back to Frontend
        res.json(response.data);

    } catch (error) {
        console.error("Error forwarding to Python service:", error.message);
        if (error.response) {
            console.error("Python Service Error Data:", error.response.data);
            return res.status(error.response.status).json(error.response.data);
        }
        res.status(500).json({ error: "Failed to communicate with Resume Analyzer service" });
    }
});

router.post('/match', upload.none(), async (req, res) => {
    try {
        const { job_description } = req.body;
        if (!job_description) {
            return res.status(400).json({ error: "Job description is required" });
        }

        const formData = new FormData();
        formData.append('job_description', job_description);

        const pythonServiceUrl = 'http://127.0.0.1:8000/jd-match';
        const response = await axios.post(pythonServiceUrl, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        res.json(response.data);

    } catch (error) {
        console.error("Error forwarding match request:", error.message);
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        res.status(500).json({ error: "Failed to communicate with Resume Analyzer service" });
    }
});

module.exports = router;
