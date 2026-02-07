import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const resumeAPI = {
    analyze: async (file) => {
        const formData = new FormData();
        formData.append('resume', file);
        return await axios.post(`${API_URL}/resume/analyze`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    matchJD: async (jobDescription) => {
        const formData = new FormData();
        formData.append('job_description', jobDescription);
        // backend/routes/resume.js uses upload.none() which parses text fields from multipart/form-data
        return await axios.post(`${API_URL}/resume/match`, formData);
    }
};
