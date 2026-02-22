import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { FileText, Download, Sparkles, User, Briefcase, GraduationCap, Award, Code, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    grade: string;
  }>;
  skills: string[];
  certifications: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
  }>;
}

const CVGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentField, setCurrentField] = useState<string>('');
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    experience: [{ title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', institution: '', year: '', grade: '' }],
    skills: [],
    certifications: [],
    projects: [{ name: '', description: '', technologies: '' }],
  });
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [generatedCV, setGeneratedCV] = useState<string>('');

  // Debounce timer for suggestions
  useEffect(() => {
    if (currentField && currentField.length > 2) {
      const timer = setTimeout(() => {
        fetchSuggestions(currentField);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [currentField]);

  const fetchSuggestions = async (text: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cv/suggestions', {
        text,
        context: {
          role: cvData.experience[0]?.title || '',
          skills: cvData.skills,
        },
      });

      if (response.data.success && response.data.suggestions.length > 0) {
        setSuggestions(response.data.suggestions);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const applySuggestion = (suggestion: string, field: string) => {
    if (field === 'summary') {
      setCvData({ ...cvData, summary: suggestion });
    }
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleAddExperience = () => {
    setCvData({
      ...cvData,
      experience: [...cvData.experience, { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
    });
  };

  const handleAddEducation = () => {
    setCvData({
      ...cvData,
      education: [...cvData.education, { degree: '', institution: '', year: '', grade: '' }],
    });
  };

  const handleAddProject = () => {
    setCvData({
      ...cvData,
      projects: [...cvData.projects, { name: '', description: '', technologies: '' }],
    });
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setCvData({
        ...cvData,
        skills: [...cvData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const handleAddCertification = () => {
    if (certInput.trim()) {
      setCvData({
        ...cvData,
        certifications: [...cvData.certifications, certInput.trim()],
      });
      setCertInput('');
    }
  };

  const handleGenerateCV = async () => {
    if (!cvData.personalInfo.fullName || !cvData.personalInfo.email) {
      toast.error('Please fill in at least your name and email');
      return;
    }

    setGenerating(true);
    try {
      const response = await axios.post('http://localhost:5000/api/cv/generate', cvData);
      
      if (response.data.success) {
        setGeneratedCV(response.data.cvUrl);
        toast.success('CV generated successfully!');
      }
    } catch (error: any) {
      console.error('Error generating CV:', error);
      toast.error('Failed to generate CV. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleAIEnhance = async () => {
    if (!cvData.personalInfo.fullName) {
      toast.error('Please fill in your basic information first');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/cv/enhance', cvData);
      
      if (response.data.success) {
        setCvData(response.data.enhancedData);
        toast.success('CV enhanced with AI suggestions!');
      }
    } catch (error: any) {
      console.error('Error enhancing CV:', error);
      toast.error('Failed to enhance CV. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-12 h-12 text-primary-400" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">CV Generator</span>
            </h1>
          </div>
          <p className="text-xl text-dark-300">
            Create a professional resume with AI assistance
          </p>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-bold text-dark-50">Personal Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={cvData.personalInfo.fullName}
              onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, fullName: e.target.value } })}
              className="px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
            <input
              type="email"
              placeholder="Email *"
              value={cvData.personalInfo.email}
              onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, email: e.target.value } })}
              className="px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={cvData.personalInfo.phone}
              onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, phone: e.target.value } })}
              className="px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={cvData.personalInfo.location}
              onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, location: e.target.value } })}
              className="px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              value={cvData.personalInfo.linkedin}
              onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, linkedin: e.target.value } })}
              className="px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
            <input
              type="url"
              placeholder="Portfolio URL"
              value={cvData.personalInfo.portfolio}
              onChange={(e) => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, portfolio: e.target.value } })}
              className="px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="mt-4">
            <div className="relative">
              <textarea
                placeholder="Professional Summary (Start typing for AI suggestions...)"
                value={cvData.summary}
                onChange={(e) => {
                  setCvData({ ...cvData, summary: e.target.value });
                  setCurrentField(e.target.value);
                }}
                onFocus={() => setCurrentField(cvData.summary)}
                rows={4}
                className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 placeholder-dark-400 focus:outline-none focus:border-primary-500"
              />
              
              {/* AI Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-10 w-full mt-2 glass rounded-xl p-4 border border-primary-500/30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-primary-400" />
                    <span className="text-sm font-semibold text-primary-400">AI Suggestions</span>
                  </div>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => applySuggestion(suggestion, 'summary')}
                        className="w-full text-left px-3 py-2 bg-dark-800/50 hover:bg-dark-700/50 rounded-lg text-sm text-dark-200 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowSuggestions(false)}
                    className="mt-2 text-xs text-dark-400 hover:text-dark-300"
                  >
                    Close suggestions
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-bold text-dark-50">Skills</h2>
          </div>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              className="flex-1 px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
            <button
              onClick={handleAddSkill}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-xl text-white font-semibold transition-colors"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-lg text-primary-400 text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => setCvData({ ...cvData, skills: cvData.skills.filter((_, i) => i !== index) })}
                  className="text-primary-400 hover:text-primary-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <button
            onClick={handleAIEnhance}
            disabled={loading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                AI Enhance
              </>
            )}
          </button>

          <button
            onClick={handleGenerateCV}
            disabled={generating}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
          >
            {generating ? (
              <LoadingSpinner />
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Generate CV
              </>
            )}
          </button>
        </motion.div>

        {/* Generated CV Preview */}
        {generatedCV && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-dark-50">Your CV is Ready!</h2>
              <a
                href={generatedCV}
                download
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-semibold text-white flex items-center gap-2 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </div>
            <p className="text-dark-300">
              Your professional CV has been generated successfully. Click the download button to save it.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CVGenerator;
