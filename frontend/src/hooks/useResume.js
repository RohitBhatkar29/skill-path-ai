import { useState } from 'react';
import axios from 'axios';

const useResume = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const analyzeResume = async (file) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('resume', file);

            // POST to Node.js Backend Proxy
            const response = await axios.post('http://localhost:5000/api/resume/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Analysis Success:", response.data);
            setResult(response.data);
            return response.data;
        } catch (err) {
            console.error("Analysis Error:", err);
            const errorMessage = err.response?.data?.detail || err.response?.data?.error || "Failed to analyze resume. Please try again.";
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const matchJobDescription = async (jobDescription) => {
        setLoading(true);
        setError(null);
        // Do not clear previous result, we append match data

        try {
            const formData = new FormData();
            formData.append('job_description', jobDescription);

            const response = await axios.post('http://localhost:5000/api/resume/match', formData);

            setResult(prev => ({ ...prev, match: response.data }));
            return response.data;
        } catch (err) {
            console.error("Match Error:", err);
            const errorMessage = err.response?.data?.error || "Failed to calculate match score.";
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        analyzeResume,
        matchJobDescription,
        loading,
        error,
        result,
        clearResult: () => setResult(null),
        clearError: () => setError(null)
    };
};

export default useResume;
