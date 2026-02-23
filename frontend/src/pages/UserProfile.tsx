import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Briefcase,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  Download,
  Share2,
  Calendar,
  MapPin,
  DollarSign,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { UserProfile as UserProfileType, CareerMatch, Roadmap } from '../types';

interface RoadmapProgress {
  careerName: string;
  roadmap: Roadmap;
  progress: {
    phase1: number;
    phase2: number;
    phase3: number;
    overall: number;
  };
  completedSkills: string[];
  startDate: string;
}

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [careers, setCareers] = useState<CareerMatch[]>([]);
  const [roadmapProgress, setRoadmapProgress] = useState<RoadmapProgress | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch | null>(null);

  useEffect(() => {
    // Load user profile
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    // Load career matches
    const storedCareers = localStorage.getItem('careerMatches');
    if (storedCareers) {
      const careerData = JSON.parse(storedCareers);
      setCareers(careerData);
      if (careerData.length > 0) {
        setSelectedCareer(careerData[0]);
      }
    }

    // Load roadmap progress
    const storedProgress = localStorage.getItem('roadmapProgress');
    if (storedProgress) {
      setRoadmapProgress(JSON.parse(storedProgress));
    }
  }, []);

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const handleSelectCareer = (career: CareerMatch) => {
    setSelectedCareer(career);
  };

  const handleStartRoadmap = (careerName: string) => {
    navigate(`/roadmap/${encodeURIComponent(careerName)}`);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 pt-24 text-center">
          <h2 className="text-2xl font-bold text-dark-200 mb-4">No Profile Found</h2>
          <p className="text-dark-400 mb-6">Create your profile to get started</p>
          <button
            onClick={() => navigate('/profile')}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-medium text-white"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">
              Your <span className="gradient-text">Career Profile</span>
            </h1>
            <button
              onClick={handleEditProfile}
              className="px-4 py-2 glass glass-hover rounded-lg flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
          <p className="text-dark-300">Track your career journey and progress</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-6"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-dark-50 mb-1">Career Explorer</h2>
                <p className="text-sm text-dark-400">Member since {new Date().toLocaleDateString()}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <BookOpen className="w-4 h-4 text-primary-400" />
                  <span className="text-dark-300">{profile.education}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span className="text-dark-300">{profile.location}</span>
                </div>
                {profile.workType && (
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="w-4 h-4 text-primary-400" />
                    <span className="text-dark-300">{profile.workType}</span>
                  </div>
                )}
                {profile.salaryExpectation && (
                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign className="w-4 h-4 text-primary-400" />
                    <span className="text-dark-300">{profile.salaryExpectation}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-dark-50 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-400" />
                Your Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            {profile.interests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-dark-50 mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Career Matches & Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Career Matches */}
            {careers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-dark-50 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary-400" />
                  Your Career Matches
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {careers.map((career, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectCareer(career)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedCareer?.career_name === career.career_name
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-white/10 bg-dark-900/50 hover:border-primary-500/50'
                      }`}
                    >
                      <div className="text-2xl font-bold text-primary-400 mb-1">
                        {career.match_percentage}%
                      </div>
                      <div className="text-sm font-medium text-dark-200">
                        {career.career_name}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedCareer && (
                  <div className="space-y-4">
                    <div className="p-4 bg-dark-900/50 rounded-xl">
                      <h4 className="font-semibold text-dark-100 mb-2">Why This Match?</h4>
                      <p className="text-sm text-dark-300">{selectedCareer.why_match}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <h4 className="text-sm font-semibold text-green-300 mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedCareer.required_skills.map((skill, i) => (
                            <span key={i} className="text-xs text-green-200">
                              {skill}{i < selectedCareer.required_skills.length - 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <h4 className="text-sm font-semibold text-red-300 mb-2">Skill Gap</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedCareer.skill_gap.map((skill, i) => (
                            <span key={i} className="text-xs text-red-200">
                              {skill}{i < selectedCareer.skill_gap.length - 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-dark-900/50 rounded-lg text-center">
                        <div className="text-xs text-dark-400 mb-1">Entry Salary</div>
                        <div className="text-sm font-semibold text-primary-300">
                          {selectedCareer.entry_salary_india}
                        </div>
                      </div>
                      <div className="p-3 bg-dark-900/50 rounded-lg text-center">
                        <div className="text-xs text-dark-400 mb-1">5-Year Projection</div>
                        <div className="text-sm font-semibold text-green-300">
                          {selectedCareer.five_year_projection}
                        </div>
                      </div>
                      <div className="p-3 bg-dark-900/50 rounded-lg text-center">
                        <div className="text-xs text-dark-400 mb-1">Market Demand</div>
                        <div className={`text-sm font-semibold ${
                          selectedCareer.market_demand === 'High' ? 'text-green-300' :
                          selectedCareer.market_demand === 'Medium' ? 'text-yellow-300' :
                          'text-red-300'
                        }`}>
                          {selectedCareer.market_demand}
                        </div>
                      </div>
                      <div className="p-3 bg-dark-900/50 rounded-lg text-center">
                        <div className="text-xs text-dark-400 mb-1">Automation Risk</div>
                        <div className={`text-sm font-semibold ${
                          selectedCareer.automation_risk === 'Low' ? 'text-green-300' :
                          selectedCareer.automation_risk === 'Medium' ? 'text-yellow-300' :
                          'text-red-300'
                        }`}>
                          {selectedCareer.automation_risk}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartRoadmap(selectedCareer.career_name)}
                      className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg transition-all"
                    >
                      View 12-Month Roadmap
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Roadmap Progress */}
            {roadmapProgress && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-dark-50 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-primary-400" />
                    Learning Progress
                  </h3>
                  <span className="text-2xl font-bold text-primary-400">
                    {roadmapProgress.progress.overall}%
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-dark-300">Overall Progress</span>
                    <span className="text-dark-400">
                      Started {new Date(roadmapProgress.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${roadmapProgress.progress.overall}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-purple-600"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-dark-900/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-dark-200">Phase 1 (0-3 months)</span>
                      <span className="text-sm font-bold text-green-400">{roadmapProgress.progress.phase1}%</span>
                    </div>
                    <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                        style={{ width: `${roadmapProgress.progress.phase1}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-dark-900/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-dark-200">Phase 2 (3-6 months)</span>
                      <span className="text-sm font-bold text-blue-400">{roadmapProgress.progress.phase2}%</span>
                    </div>
                    <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-600"
                        style={{ width: `${roadmapProgress.progress.phase2}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-dark-900/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-dark-200">Phase 3 (6-12 months)</span>
                      <span className="text-sm font-bold text-purple-400">{roadmapProgress.progress.phase3}%</span>
                    </div>
                    <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                        style={{ width: `${roadmapProgress.progress.phase3}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl">
                  <h4 className="text-sm font-semibold text-primary-300 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Completed Skills ({roadmapProgress.completedSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {roadmapProgress.completedSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-dark-50 mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/resume')}
                  className="p-4 glass-hover rounded-xl text-left group"
                >
                  <Award className="w-6 h-6 text-primary-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-medium text-dark-100">Analyze Resume</div>
                  <div className="text-xs text-dark-400">Get ATS score</div>
                </button>

                <button
                  onClick={() => navigate('/jobs')}
                  className="p-4 glass-hover rounded-xl text-left group"
                >
                  <Briefcase className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-medium text-dark-100">Find Jobs</div>
                  <div className="text-xs text-dark-400">Browse opportunities</div>
                </button>

                <button
                  onClick={() => navigate('/cv-generator')}
                  className="p-4 glass-hover rounded-xl text-left group"
                >
                  <Download className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-medium text-dark-100">Generate CV</div>
                  <div className="text-xs text-dark-400">Create professional CV</div>
                </button>

                <button
                  onClick={() => navigate('/blog')}
                  className="p-4 glass-hover rounded-xl text-left group"
                >
                  <BookOpen className="w-6 h-6 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-medium text-dark-100">Read Blog</div>
                  <div className="text-xs text-dark-400">Career insights</div>
                </button>
              </div>
            </motion.div>

            {/* Career Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 bg-gradient-to-br from-primary-500/10 to-purple-600/10 border border-primary-500/20"
            >
              <h3 className="text-lg font-bold text-dark-50 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-400" />
                Daily Career Tips
              </h3>
              <ul className="space-y-3 text-sm text-dark-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1">•</span>
                  <span>Dedicate 1-2 hours daily to learning new skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1">•</span>
                  <span>Build projects to showcase your abilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1">•</span>
                  <span>Network with professionals in your field</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1">•</span>
                  <span>Update your resume and LinkedIn regularly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1">•</span>
                  <span>Apply to 10-15 jobs per week consistently</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
