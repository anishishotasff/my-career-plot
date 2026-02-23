import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeResume } from '../services/api';
import { ResumeAnalysis } from '../types';

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [targetCareer, setTargetCareer] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast.error('Please paste your resume text');
      return;
    }
    if (!targetCareer.trim()) {
      toast.error('Please enter target career');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeResume(resumeText, targetCareer);
      setAnalysis(result);
      toast.success('Resume analyzed successfully!');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Resume <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-dark-300">
            Get ATS score, skill gap analysis, and optimization suggestions
          </p>
        </motion.div>

        {!analysis ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Target Career *
              </label>
              <input
                type="text"
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
                placeholder="e.g., Full Stack Developer, Data Scientist"
                className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-dark-50 placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Resume Text *
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={12}
                className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-dark-50 placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
              />
              <p className="text-xs text-dark-500 mt-2">
                Copy and paste your resume content (plain text works best)
              </p>
            </div>

            {loading ? (
              <LoadingSpinner message="Analyzing your resume..." />
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl font-semibold text-white flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
              >
                <Upload className="w-5 h-5" />
                <span>Analyze Resume</span>
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* ATS Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-8"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg text-dark-300 mb-4">ATS Compatibility Score</h3>
                <div className={`text-7xl font-bold mb-2 ${getScoreColor(analysis.ats_score)}`}>
                  {analysis.ats_score}%
                </div>
                <p className="text-dark-400 text-sm">
                  {analysis.ats_score >= 80 ? 'Excellent! Your resume is highly ATS-friendly' :
                   analysis.ats_score >= 60 ? 'Good, but there\'s room for improvement' :
                   'Needs improvement to pass ATS screening'}
                </p>
              </div>
              
              <div className="max-w-md mx-auto mb-6">
                <div className="h-4 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis.ats_score}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full bg-gradient-to-r ${getScoreGradient(analysis.ats_score)}`}
                  />
                </div>
              </div>

              {/* ATS Score Breakdown */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-dark-900/50 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">
                    {analysis.detected_skills.length}
                  </div>
                  <div className="text-xs text-dark-400 mt-1">Skills Found</div>
                </div>
                <div className="text-center p-4 bg-dark-900/50 rounded-xl">
                  <div className="text-2xl font-bold text-red-400">
                    {analysis.missing_skills.length}
                  </div>
                  <div className="text-xs text-dark-400 mt-1">Skills Missing</div>
                </div>
                <div className="text-center p-4 bg-dark-900/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-400">
                    {analysis.keyword_suggestions.length}
                  </div>
                  <div className="text-xs text-dark-400 mt-1">Keywords to Add</div>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Detected Skills */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-dark-50 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Detected Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.detected_skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-green-300 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Missing Skills */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-dark-50 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missing_skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Keyword Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-dark-50 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
                Keyword Suggestions
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {analysis.keyword_suggestions.map((keyword, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-200"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Improvement Points */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-dark-50 mb-4">Improvement Suggestions</h3>
              <ul className="space-y-3">
                {analysis.improvement_points.map((point, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-purple-400 mt-1 font-bold">{i + 1}.</span>
                    <span className="text-dark-200">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ATS Tips */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-6 bg-gradient-to-br from-primary-500/10 to-purple-600/10 border border-primary-500/20"
            >
              <h3 className="text-xl font-bold text-dark-50 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
                ATS Optimization Tips
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary-300 text-sm">✓ DO</h4>
                  <ul className="text-sm text-dark-300 space-y-1">
                    <li>• Use standard section headings (Experience, Education, Skills)</li>
                    <li>• Include relevant keywords from job description</li>
                    <li>• Use simple, clean formatting</li>
                    <li>• Add quantifiable achievements</li>
                    <li>• Save as .docx or .pdf format</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-300 text-sm">✗ DON'T</h4>
                  <ul className="text-sm text-dark-300 space-y-1">
                    <li>• Use tables, images, or graphics</li>
                    <li>• Include headers/footers with important info</li>
                    <li>• Use unusual fonts or colors</li>
                    <li>• Stuff keywords unnaturally</li>
                    <li>• Use abbreviations without spelling out</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Analyze Another */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <button
                onClick={() => {
                  setAnalysis(null);
                  setResumeText('');
                  setTargetCareer('');
                }}
                className="px-8 py-3 glass glass-hover rounded-lg font-medium text-dark-50"
              >
                Analyze Another Resume
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
