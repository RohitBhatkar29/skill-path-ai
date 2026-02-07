import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import {
    Upload, FileText, X, ChevronDown, ChevronUp, Download, BarChart2, CheckCircle,
    Briefcase, Code, Database, Cloud, Brain, Server
} from 'lucide-react';
import { resumeAPI } from '../services/api';
import './ResumeAnalyzer.css';

// Skill categories with colors
const skillColors = {
    'Communication': '#3b82f6',
    'Git': '#f97316',
    'GitHub': '#1f2937',
    'Jupyter notebook': '#f59e0b',
    'Machine learning': '#8b5cf6',
    'Matplotlib': '#06b6d4',
    'Mysql': '#0284c7',
    'Numpy': '#14b8a6',
    'Pandas': '#ec4899',
    'Power bi': '#eab308',
    'Python': '#3b82f6',
    'R': '#6366f1',
    'Seaborn': '#10b981',
    'Sql': '#0ea5e9',
    'Visual studio code': '#0891b2',
    'default': '#64748b'
};

// Available job categories
const jobCategories = [
    'Backend Developer', 'Cloud Engineer', 'Data Scientist',
    'Frontend Developer', 'Full Stack Developer', 'Machine Learning Engineer',
    'Mobile App Developer', 'HR/Analytics', 'Python Developer'
];

export default function ResumeAnalyzer() {
    const [activeTab, setActiveTab] = useState('file'); // 'file', 'text', or 'create'
    const [file, setFile] = useState(null);
    const [pastedText, setPastedText] = useState('');
    const [createResumeData, setCreateResumeData] = useState({
        // 1. Personal Info
        fullName: '', email: '', phone: '',
        linkedin: '', github: '', portfolio: '', location: '',
        // 2. Career Summary
        summary: '',
        // 3. Education
        education: [{ degree: '', specialization: '', university: '', year: '', cgpa: '' }],
        // 4. Skills
        technicalSkills: '', softSkills: '',
        // 5. Projects
        projects: [{ title: '', description: '', technologies: '', role: '', outcome: '' }],
        // 6. Experience
        experience: [{ company: '', role: '', duration: '', responsibilities: '', achievements: '' }],
        // 7. Certifications
        certifications: [{ name: '', platform: '', year: '' }],
        // 8. Achievements
        achievements: '',
        // 9. Extra
        publications: '', hobbies: ''
    });
    const [jobDescription, setJobDescription] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [calculatingMatch, setCalculatingMatch] = useState(false);
    const [results, setResults] = useState(null);
    const [matchScore, setMatchScore] = useState(null);
    const [missingSkills, setMissingSkills] = useState([]);
    const [recommendedSkills, setRecommendedSkills] = useState([]);
    const [error, setError] = useState('');
    const [showFullText, setShowFullText] = useState(false);
    const [resumeText, setResumeText] = useState('');
    const [generatedResume, setGeneratedResume] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.docx') || droppedFile.name.endsWith('.txt'))) {
            setFile(droppedFile);
            setError('');
            analyzeFile(droppedFile);
        }
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError('');
            analyzeFile(selectedFile);
        }
    };

    const analyzeFile = async (fileToAnalyze) => {
        setAnalyzing(true);
        setError('');
        setResults(null);
        setMatchScore(null);

        try {
            console.log('Starting resume analysis...');
            const response = await resumeAPI.analyze(fileToAnalyze);
            console.log('API Response:', response);
            const data = response.data;
            console.log('Data:', data);

            // Map FastAPI response to our display format
            const mappedResults = {
                personal_info: {
                    name: data.name || 'Unknown',
                    email: data.email || '',
                    phone: data.phone || ''
                },
                predicted_roles: data.all_predictions?.map(p => ({
                    role: p.job_role,
                    confidence: `${Math.min(100, Math.max(0, p.confidence * 10)).toFixed(0)}%`
                })) || [],
                extracted_skills: data.skills || [],
                resume_summary: data.resume_text || `Primary Role: ${data.primary_job_role}`,
                primary_role: data.primary_job_role || ''
            };

            console.log('Mapped Results:', mappedResults);
            setResults(mappedResults);
            setResumeText(data.resume_text || `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nPrimary Role: ${data.primary_job_role}`);
        } catch (err) {
            console.error('Analysis Error:', err);
            setError(err.message || 'Failed to analyze resume. Please try again.');
        } finally {
            setAnalyzing(false);
        }
    };

    const handleTextAnalysis = () => {
        if (!pastedText.trim()) return;

        const blob = new Blob([pastedText], { type: 'text/plain' });
        const file = new File([blob], "pasted-resume.txt", { type: 'text/plain' });

        analyzeFile(file);
    };

    const downloadGeneratedResume = () => {
        if (!createResumeData) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const contentWidth = pageWidth - (2 * margin);
        let yPos = 20;

        // Font Setup
        doc.setFont("times", "normal");
        doc.setTextColor(0, 0, 0);

        const checkPageBreak = (height = 10) => {
            if (yPos + height > pageHeight - 20) {
                doc.addPage();
                yPos = 20;
            }
        };

        const drawHorizontalLine = () => {
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 5;
        };

        const drawSectionTitle = (title) => {
            checkPageBreak(15);
            yPos += 5;
            doc.setFont("times", "bold");
            doc.setFontSize(12);
            // Center Element
            const textWidth = doc.getTextWidth(title.toUpperCase());
            doc.text(title.toUpperCase(), (pageWidth - textWidth) / 2, yPos);
            yPos += 8;
        };

        // --- HEADER ---
        // Name (Left, Bold, Caps)
        doc.setFont("times", "bold");
        doc.setFontSize(14);
        doc.text(createResumeData.fullName.toUpperCase(), margin, yPos);

        // Contact (Right, stacked)
        doc.setFont("times", "normal");
        doc.setFontSize(10);

        const emailText = `Email- ${createResumeData.email}`;
        const phoneText = `Mobile - ${createResumeData.phone}`;

        const emailWidth = doc.getTextWidth(emailText);
        const phoneWidth = doc.getTextWidth(phoneText);

        doc.text(emailText, pageWidth - margin - emailWidth, yPos);
        doc.text(phoneText, pageWidth - margin - phoneWidth, yPos + 5);

        yPos += 10;
        drawHorizontalLine();


        // --- EDUCATION ---
        if (createResumeData.education.length > 0) {
            drawSectionTitle("EDUCATION");

            createResumeData.education.forEach(edu => {
                checkPageBreak(25);
                doc.setFont("times", "bold");
                doc.setFontSize(11);

                // Institution
                doc.text(edu.university, margin, yPos);

                // Location/Year (Right)
                doc.setFont("times", "normal");
                const rightText = edu.year;
                const rightW = doc.getTextWidth(rightText);
                doc.text(rightText, pageWidth - margin - rightW, yPos);
                yPos += 5;

                // Degree
                doc.setFont("times", "normal");
                doc.text(`${edu.degree} in ${edu.specialization}`, margin, yPos);
                yPos += 5;

                // CGPA (Optional)
                if (edu.cgpa) {
                    doc.text(`CGPA: ${edu.cgpa}`, margin, yPos);
                    yPos += 5;
                }

                doc.setFont("times", "normal");
                yPos += 3;
            });
            drawHorizontalLine();
        }

        // --- SKILLS SUMMARY ---
        if (createResumeData.technicalSkills || createResumeData.softSkills) {
            drawSectionTitle("SKILLS SUMMARY");

            const renderSkillRow = (label, value) => {
                if (!value) return;
                checkPageBreak(10);
                doc.setFont("times", "bold");
                doc.text(label, margin, yPos);

                const labelWidth = 40; // Fixed width for labels
                doc.setFont("times", "normal");
                const splitVal = doc.splitTextToSize(value, contentWidth - labelWidth);
                doc.text(splitVal, margin + labelWidth, yPos);
                yPos += (splitVal.length * 5) + 2;
            };

            renderSkillRow("Technical:", createResumeData.technicalSkills);
            renderSkillRow("Soft Skills:", createResumeData.softSkills);

            drawHorizontalLine();
        }

        // --- WORK EXPERIENCE ---
        if (createResumeData.experience.length > 0) {
            drawSectionTitle("WORK EXPERIENCE");

            createResumeData.experience.forEach(exp => {
                checkPageBreak(30);

                // Company & Role Header
                doc.setFont("times", "bold");
                doc.text(`${exp.role} at ${exp.company}`, margin, yPos);
                yPos += 5;

                doc.setFont("times", "italic");
                doc.text(exp.duration, margin, yPos);
                yPos += 5;

                doc.setFont("times", "normal");
                const splitDesc = doc.splitTextToSize(exp.responsibilities, contentWidth);
                doc.text(splitDesc, margin, yPos);
                yPos += (splitDesc.length * 5) + 5;
            });
            drawHorizontalLine();
        }

        // --- PROJECTS ---
        if (createResumeData.projects.length > 0) {
            drawSectionTitle("PROJECTS");

            createResumeData.projects.forEach(proj => {
                checkPageBreak(25);
                // Title (Upper Case)
                doc.setFont("times", "bold");
                doc.text(proj.title.toUpperCase(), margin, yPos);
                yPos += 5;

                // Technologies
                if (proj.technologies) {
                    doc.setFont("times", "normal");
                    const techLines = doc.splitTextToSize(`Technologies Used: ${proj.technologies}`, contentWidth);
                    doc.text(techLines, margin, yPos);
                    yPos += (techLines.length * 5) + 2;
                }

                // Description
                doc.setFont("times", "normal");
                const descText = `${proj.description} ${proj.outcome ? 'Outcome: ' + proj.outcome : ''}`;
                const splitDesc = doc.splitTextToSize(descText, contentWidth);
                doc.text(splitDesc, margin, yPos);
                yPos += (splitDesc.length * 5) + 5;
            });
            drawHorizontalLine();
        }

        // --- CERTIFICATES ---
        if (createResumeData.certifications.length > 0) {
            drawSectionTitle("CERTIFICATE");
            createResumeData.certifications.forEach(cert => {
                checkPageBreak(10);
                doc.setFont("times", "normal");
                doc.text(`${cert.name} - ${cert.platform} (${cert.year})`, margin, yPos);
                yPos += 6;
            });
            drawHorizontalLine();
        }

        // --- ACHIEVEMENTS / EXTRA ---
        if (createResumeData.achievements) {
            drawSectionTitle("ACHIEVEMENTS");
            doc.setFont("times", "normal");
            const lines = doc.splitTextToSize(createResumeData.achievements, contentWidth);
            doc.text(lines, margin, yPos);
            yPos += (lines.length * 5) + 5;
            drawHorizontalLine();
        }

        doc.save(`${createResumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    };

    const analyzeGeneratedResume = () => {
        if (!generatedResume) return;
        const blob = new Blob([generatedResume], { type: 'text/plain' });
        const file = new File([blob], "created-resume.txt", { type: 'text/plain' });
        analyzeFile(file);
    };

    const updateListField = (field, index, key, value) => {
        const list = [...createResumeData[field]];
        list[index] = { ...list[index], [key]: value };
        setCreateResumeData({ ...createResumeData, [field]: list });
    };

    const addListItem = (field, template) => {
        setCreateResumeData({
            ...createResumeData,
            [field]: [...createResumeData[field], template]
        });
    };

    const removeListItem = (field, index) => {
        const list = [...createResumeData[field]];
        if (list.length > 1) {
            list.splice(index, 1);
            setCreateResumeData({ ...createResumeData, [field]: list });
        }
    };

    const handleCreateResume = () => {
        const {
            fullName, email, phone, linkedin, github, portfolio, location,
            summary, education, technicalSkills, softSkills, projects,
            experience, certifications, achievements, publications, hobbies
        } = createResumeData;

        if (!fullName || !email || !technicalSkills) {
            setError('Please fill in at least Name, Email and Technical Skills.');
            return;
        }

        // Format Education
        const eduText = education.map(e =>
            `${e.degree} in ${e.specialization} | ${e.university} (${e.year}) | CGPA: ${e.cgpa}`
        ).join('\n');

        // Format Projects
        const projText = projects.map(p =>
            `Title: ${p.title}\nDescription: ${p.description}\nTech: ${p.technologies}\nRole: ${p.role}\nOutcome: ${p.outcome}`
        ).join('\n\n');

        // Format Experience
        const expText = experience.map(e =>
            `${e.role} at ${e.company} (${e.duration})\nResponsibilities: ${e.responsibilities}\nAchievements: ${e.achievements}`
        ).join('\n\n');

        // Format Certifications
        const certText = certifications.map(c =>
            `${c.name} from ${c.platform} (${c.year})`
        ).join('\n');

        const resumeContent = `
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Location: ${location}
Links: ${linkedin} | ${github} | ${portfolio}

Summary:
${summary}

Education:
${eduText}

Skills:
Technical: ${technicalSkills}
Soft Skills: ${softSkills}

Projects:
${projText}

Experience:
${expText}

Certifications:
${certText}

Achievements:
${achievements}

Extra:
Publications: ${publications}
Hobbies: ${hobbies}
        `.trim();

        setGeneratedResume(resumeContent);
    };

    const removeFile = () => {
        setFile(null);
        setResults(null);
        setMatchScore(null);
        setResumeText('');
    };

    const calculateMatchScore = async () => {
        if (!jobDescription.trim()) {
            return;
        }

        setCalculatingMatch(true);
        setError('');

        try {
            // Use new matchJD API
            const response = await resumeAPI.matchJD(jobDescription);
            const data = response.data;

            setMatchScore(parseFloat(data.ats_match_score) || 0);
            setMissingSkills(data.missing_skills || []);
            setRecommendedSkills(data.recommended_skills || []);

        } catch (err) {
            console.error('Match score error:', err);
            setError(err.message || 'Failed to calculate match score.');
        } finally {
            setCalculatingMatch(false);
        }
    };

    const getSkillColor = (skill) => {
        return skillColors[skill] || skillColors['default'];
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="resume-analyzer-container">
            {/* Left Sidebar */}
            <aside className="resume-sidebar">
                <div className="sidebar-section about-section">
                    <h3>About</h3>
                    <p>
                        <strong>Resume Analyzer Pro</strong> uses Machine Learning to predict job categories, extract skills, and match resumes to job descriptions.
                    </p>
                </div>

                <div className="sidebar-section categories-section">
                    <h3>Available Categories</h3>
                    <ul className="categories-list">
                        {jobCategories.map((category) => (
                            <li key={category}>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    {category}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="resume-main">
                <p className="upload-instruction">
                    Upload a resume or <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('text'); }}>paste the text</a> to get an instant analysis.
                </p>

                {/* Tab Toggle */}
                <div className="upload-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'file' ? 'active' : ''}`}
                        onClick={() => setActiveTab('file')}
                    >
                        <Upload size={18} />
                        File Upload
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                        onClick={() => setActiveTab('text')}
                    >
                        <FileText size={18} />
                        Paste Text
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                        onClick={() => setActiveTab('create')}
                    >
                        <Briefcase size={18} />
                        Create Resume
                    </button>
                </div>

                {/* Upload Section */}

                {activeTab === 'file' ? (
                    <div className="upload-section">
                        <p className="file-types">Choose a resume file (PDF, DOCX, TXT)</p>

                        <div
                            className={`drop-zone ${analyzing ? 'analyzing' : ''}`}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <Upload size={24} className="upload-icon" />
                            <div className="drop-text">
                                <span className="drop-main">Drag and drop file here</span>
                                <span className="drop-sub">Limit 200MB per file • PDF, DOCX, TXT</span>
                            </div>
                            <button
                                className="browse-btn"
                                onClick={() => fileInputRef.current.click()}
                                disabled={analyzing}
                            >
                                Browse files
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.docx,.txt"
                                onChange={handleFileSelect}
                                hidden
                            />
                        </div>

                        {/* Selected File */}
                        {file && (
                            <div className="selected-file">
                                <FileText size={20} />
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{formatFileSize(file.size)}</span>
                                <button className="remove-file" onClick={removeFile}>
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                ) : activeTab === 'text' ? (
                    <div className="paste-section">
                        <textarea
                            value={pastedText}
                            onChange={(e) => setPastedText(e.target.value)}
                            placeholder="Paste your resume text here..."
                            rows={8}
                        />
                        <button
                            className="analyze-text-btn"
                            onClick={handleTextAnalysis}
                            disabled={!pastedText.trim() || analyzing}
                        >
                            {analyzing ? 'Analyzing...' : 'Analyze Text'}
                        </button>
                    </div>
                ) : (
                    <div className="create-resume-section">
                        {/* 1. Personal Info */}
                        <h3>1. Personal Information</h3>
                        <div className="form-grid">
                            <input type="text" placeholder="Full Name *" value={createResumeData.fullName} onChange={e => setCreateResumeData({ ...createResumeData, fullName: e.target.value })} className="form-input" />
                            <input type="email" placeholder="Email *" value={createResumeData.email} onChange={e => setCreateResumeData({ ...createResumeData, email: e.target.value })} className="form-input" />
                            <input type="tel" placeholder="Mobile Number" value={createResumeData.phone} onChange={e => setCreateResumeData({ ...createResumeData, phone: e.target.value })} className="form-input" />
                            <input type="text" placeholder="Location (City, Country)" value={createResumeData.location} onChange={e => setCreateResumeData({ ...createResumeData, location: e.target.value })} className="form-input" />
                            <input type="text" placeholder="LinkedIn URL" value={createResumeData.linkedin} onChange={e => setCreateResumeData({ ...createResumeData, linkedin: e.target.value })} className="form-input" />
                            <input type="text" placeholder="GitHub URL" value={createResumeData.github} onChange={e => setCreateResumeData({ ...createResumeData, github: e.target.value })} className="form-input" />
                            <input type="text" placeholder="Portfolio URL" value={createResumeData.portfolio} onChange={e => setCreateResumeData({ ...createResumeData, portfolio: e.target.value })} className="form-input full-width" />
                        </div>

                        {/* 2. Career Summary */}
                        <h3>2. Career Summary</h3>
                        <div className="form-grid">
                            <textarea placeholder="Write a short professional objective (2-3 lines)..." value={createResumeData.summary} onChange={e => setCreateResumeData({ ...createResumeData, summary: e.target.value })} className="form-textarea full-width" rows={3} />
                        </div>

                        {/* 3. Education */}
                        <h3>3. Education Details</h3>
                        {createResumeData.education.map((edu, index) => (
                            <div key={index} className="dynamic-item">
                                <div className="form-grid">
                                    <input type="text" placeholder="Degree (e.g. B.Tech)" value={edu.degree} onChange={e => updateListField('education', index, 'degree', e.target.value)} className="form-input" />
                                    <input type="text" placeholder="Specialization (e.g. CS)" value={edu.specialization} onChange={e => updateListField('education', index, 'specialization', e.target.value)} className="form-input" />
                                    <input type="text" placeholder="University/College" value={edu.university} onChange={e => updateListField('education', index, 'university', e.target.value)} className="form-input" />
                                    <input type="text" placeholder="Passing Year" value={edu.year} onChange={e => updateListField('education', index, 'year', e.target.value)} className="form-input" />
                                    <input type="text" placeholder="CGPA / Grade" value={edu.cgpa} onChange={e => updateListField('education', index, 'cgpa', e.target.value)} className="form-input" />
                                </div>
                                {createResumeData.education.length > 1 && <button className="remove-btn" onClick={() => removeListItem('education', index)}>Remove</button>}
                            </div>
                        ))}
                        <button className="add-btn" onClick={() => addListItem('education', { degree: '', specialization: '', university: '', year: '', cgpa: '' })}>+ Add Education</button>

                        {/* 4. Skills */}
                        <h3>4. Skills</h3>
                        <div className="form-grid">
                            <div className="full-width">
                                <label>Technical Skills (Languages, Frameworks, Tools)</label>
                                <textarea placeholder="Python, React, SQL, AWS, Git..." value={createResumeData.technicalSkills} onChange={e => setCreateResumeData({ ...createResumeData, technicalSkills: e.target.value })} className="form-textarea full-width" rows={3} />
                            </div>
                            <div className="full-width">
                                <label>Soft Skills</label>
                                <textarea placeholder="Communication, Teamwork, Leadership..." value={createResumeData.softSkills} onChange={e => setCreateResumeData({ ...createResumeData, softSkills: e.target.value })} className="form-textarea full-width" rows={2} />
                            </div>
                        </div>

                        {/* 5. Projects */}
                        <h3>5. Projects</h3>
                        {createResumeData.projects.map((proj, index) => (
                            <div key={index} className="dynamic-item">
                                <div className="form-grid">
                                    <input type="text" placeholder="Project Title" value={proj.title} onChange={e => updateListField('projects', index, 'title', e.target.value)} className="form-input full-width" />
                                    <textarea placeholder="Description (2-3 lines)..." value={proj.description} onChange={e => updateListField('projects', index, 'description', e.target.value)} className="form-textarea full-width" rows={2} />
                                    <input type="text" placeholder="Tech Stack Used" value={proj.technologies} onChange={e => updateListField('projects', index, 'technologies', e.target.value)} className="form-input full-width" />
                                    <input type="text" placeholder="Your Role" value={proj.role} onChange={e => updateListField('projects', index, 'role', e.target.value)} className="form-input" />
                                    <input type="text" placeholder="Outcome / Result" value={proj.outcome} onChange={e => updateListField('projects', index, 'outcome', e.target.value)} className="form-input" />
                                </div>
                                {createResumeData.projects.length > 1 && <button className="remove-btn" onClick={() => removeListItem('projects', index)}>Remove</button>}
                            </div>
                        ))}
                        <button className="add-btn" onClick={() => addListItem('projects', { title: '', description: '', technologies: '', role: '', outcome: '' })}>+ Add Project</button>

                        {/* 6. Experience */}
                        <h3>6. Experience / Internship</h3>
                        {createResumeData.experience.map((exp, index) => (
                            <div key={index} className="dynamic-item">
                                <div className="form-grid">
                                    <input type="text" placeholder="Company Name" value={exp.company} onChange={e => updateListField('experience', index, 'company', e.target.value)} className="form-input" />
                                    <input type="text" placeholder="Role (e.g. Intern)" value={exp.role} onChange={e => updateListField('experience', index, 'role', e.target.value)} className="form-input" />
                                    <input type="text" placeholder="Duration" value={exp.duration} onChange={e => updateListField('experience', index, 'duration', e.target.value)} className="form-input full-width" />
                                    <textarea placeholder="Key Responsibilities..." value={exp.responsibilities} onChange={e => updateListField('experience', index, 'responsibilities', e.target.value)} className="form-textarea full-width" rows={3} />
                                    <textarea placeholder="Achievements..." value={exp.achievements} onChange={e => updateListField('experience', index, 'achievements', e.target.value)} className="form-textarea full-width" rows={2} />
                                </div>
                                {createResumeData.experience.length > 1 && <button className="remove-btn" onClick={() => removeListItem('experience', index)}>Remove</button>}
                            </div>
                        ))}
                        <button className="add-btn" onClick={() => addListItem('experience', { company: '', role: '', duration: '', responsibilities: '', achievements: '' })}>+ Add Experience</button>

                        {/* 7. Certifications */}
                        <h3>7. Certifications</h3>
                        {createResumeData.certifications.map((cert, index) => (
                            <div key={index} className="dynamic-item">
                                <div className="form-grid">
                                    <input type="text" placeholder="Course Name" value={cert.name} onChange={e => updateListField('certifications', index, 'name', e.target.value)} className="form-input full-width" />
                                    <input type="text" placeholder="Platform" value={cert.platform} onChange={e => updateListField('certifications', index, 'platform', e.target.value)} className="form-input" />
                                    <input type="text" placeholder="Year" value={cert.year} onChange={e => updateListField('certifications', index, 'year', e.target.value)} className="form-input" />
                                </div>
                                {createResumeData.certifications.length > 1 && <button className="remove-btn" onClick={() => removeListItem('certifications', index)}>Remove</button>}
                            </div>
                        ))}
                        <button className="add-btn" onClick={() => addListItem('certifications', { name: '', platform: '', year: '' })}>+ Add Certification</button>

                        {/* 8. Achievements */}
                        <h3>8. Achievements</h3>
                        <textarea placeholder="Hackathons, Competitions, Awards..." value={createResumeData.achievements} onChange={e => setCreateResumeData({ ...createResumeData, achievements: e.target.value })} className="form-textarea full-width" rows={3} />

                        {/* 9. Extra */}
                        <h3>9. Extra</h3>
                        <div className="form-grid">
                            <textarea placeholder="Publications..." value={createResumeData.publications} onChange={e => setCreateResumeData({ ...createResumeData, publications: e.target.value })} className="form-textarea full-width" rows={2} />
                            <textarea placeholder="Hobbies..." value={createResumeData.hobbies} onChange={e => setCreateResumeData({ ...createResumeData, hobbies: e.target.value })} className="form-textarea full-width" rows={2} />
                        </div>

                        <div className="generate-actions">
                            <button
                                className="analyze-text-btn"
                                onClick={handleCreateResume}
                                style={{ marginTop: '2rem', padding: '1rem', fontSize: '1.1rem', width: '100%' }}
                            >
                                Generate Resume & Preview
                            </button>

                            {generatedResume && (
                                <div className="after-generation-options" style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#0369a1', fontWeight: 'bold' }}>
                                        <CheckCircle size={20} />
                                        <span>Resume Generated Successfully!</span>
                                    </div>
                                    <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#0f172a' }}>
                                        You can now download your resume or proceed to AI analysis.
                                    </p>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <button
                                            onClick={downloadGeneratedResume}
                                            className="download-btn"
                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', background: '#fff', border: '1px solid #0ea5e9', color: '#0ea5e9', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                                        >
                                            <Download size={18} /> Download PDF
                                        </button>
                                        <button
                                            onClick={analyzeGeneratedResume}
                                            className="analyze-btn"
                                            disabled={analyzing}
                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', opacity: analyzing ? 0.7 : 1 }}
                                        >
                                            <BarChart2 size={18} /> {analyzing ? 'Analyzing...' : 'Analyze Now'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>



                )
                }


                {/* Error Message */}
                {
                    error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )
                }

                {/* Loading State */}
                {
                    analyzing && (
                        <div className="analyzing-indicator">
                            <div className="spinner"></div>
                            <span>Analyzing resume...</span>
                        </div>
                    )
                }

                {/* Analysis Results */}
                {
                    results && !analyzing && (
                        <div className="analysis-results">
                            <h2>Analysis Results</h2>

                            {/* Category Predictions */}
                            <section className="predictions-section">
                                <h3>Category Predictions</h3>
                                {results.predicted_roles?.map((role, index) => (
                                    <div key={index} className="prediction-item">
                                        <span className="prediction-label">{role.role}</span>
                                        <div className="prediction-bar-container">
                                            <span className="prediction-percent">{role.confidence}</span>
                                            <div className="prediction-bar">
                                                <div
                                                    className="prediction-fill"
                                                    style={{ width: role.confidence }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>

                            {/* Extracted Skills */}
                            <section className="skills-section">
                                <h3>Extracted Skills</h3>
                                <div className="skills-list">
                                    {results.extracted_skills?.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="skill-tag"
                                            style={{ backgroundColor: getSkillColor(skill) }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Show Full Resume Text */}
                            <section className="resume-text-section">
                                <button
                                    className="toggle-text-btn"
                                    onClick={() => setShowFullText(!showFullText)}
                                >
                                    {showFullText ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    Show Full Resume Text
                                </button>

                                {showFullText && (
                                    <div className="resume-preview">
                                        <div className="resume-header">
                                            <strong>{results.personal_info?.name || 'Candidate'}</strong>
                                            <span>{results.personal_info?.email || ''}</span>
                                            <span>Mobile NO: {results.personal_info?.phone || ''}</span>
                                        </div>
                                        {results.resume_summary && (
                                            <p className="resume-summary">{results.resume_summary}</p>
                                        )}
                                    </div>
                                )}
                            </section>
                        </div>
                    )
                }
            </main >

            {/* Right Section - Job Description Matcher */}
            < aside className="job-matcher-sidebar" >
                <h3>Job Description Matcher</h3>
                <p className="jd-instruction">Paste a Job Description here</p>

                <textarea
                    className="jd-textarea"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Why Join Us?

Opportunity to work on challenging and impactful projects.

A collaborative and supportive work environment.

Continuous learning and professional development opportunities.

Competitive salary and benefits package."
                    rows={8}
                />

                <button
                    className="calculate-btn"
                    onClick={calculateMatchScore}
                    disabled={!jobDescription.trim() || !results || calculatingMatch}
                >
                    {calculatingMatch ? 'Calculating...' : 'Calculate Match Score'}
                </button>

                {
                    matchScore !== null && (
                        <div className="match-result">
                            <span className="match-label">Match Score: {matchScore.toFixed(2)}%</span>
                            <div className="match-bar">
                                <div
                                    className="match-fill"
                                    style={{ width: `${matchScore}%` }}
                                ></div>
                            </div>

                            {/* Missing Skills Section */}
                            {missingSkills.length > 0 && (
                                <div className="missing-skills-section">
                                    <h4>Missing Skills</h4>
                                    <div className="skills-list small">
                                        {missingSkills.map((skill, index) => (
                                            <span key={index} className="skill-tag missing">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recommended Skills Section */}
                            {recommendedSkills.length > 0 && (
                                <div className="recommended-skills-section">
                                    <h4>Recommended Skills</h4>
                                    <div className="skills-list small">
                                        {recommendedSkills.map((skill, index) => (
                                            <span key={index} className="skill-tag recommended">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
            </aside >
        </div >
    );
}
