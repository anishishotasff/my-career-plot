import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { analyzeCareer } from '../services/api';
import { UserProfile } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  
  const [profile, setProfile] = useState<UserProfile>({
    skills: [],
    interests: [],
    education: '',
    workType: '',
    salaryExpectation: '',
    location: 'India',
  });

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== skill) });
  };

  const addInterest = () => {
    if (interestInput.trim() && !profile.interests.includes(interestInput.trim())) {
      setProfile({ ...profile, interests: [...profile.interests, interestInput.trim()] });
      setInterestInput('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile({ ...profile, interests: profile.interests.filter((i) => i !== interest) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (profile.skills.length === 0) {
      toast.error('Please add at least one skill');
      return;
    }
    if (!profile.education) {
      toast.error('Please select your education level');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeCareer(profile);
      localStorage.setItem('careerMatches', JSON.stringify(result.career_matches));
      localStorage.setItem('userProfile', JSON.stringify(profile));
      toast.success('Career analysis complete!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to analyze profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Navbar />
        <div className="pt-24">
          <LoadingSpinner message="Analyzing your profile with AI..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-4">
            Tell Us About <span className="gradient-text">Yourself</span>
          </h1>
          <p className="text-dark-300">Help us understand your skills and career goals</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Your Skills *
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="e.g., JavaScript, Python, React"
                className="flex-1 px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-dark-50 placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-3 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm flex items-center gap-2"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Your Interests
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                placeholder="e.g., AI, Web Development, Data Science"
                className="flex-1 px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-dark-50 placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="button"
                onClick={addInterest}
                className="px-4 py-3 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm flex items-center gap-2"
                >
                  {interest}
                  <button type="button" onClick={() => removeInterest(interest)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Education Level *
            </label>
            <select
              value={profile.education}
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
              className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-dark-50 focus:outline-none focus:border-primary-500 transition-colors"
            >
              <option value="">Select education level</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Preferred Work Type
            </label>
            <select
              value={profile.workType}
              onChange={(e) => setProfile({ ...profile, workType: e.target.value })}
              className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-dark-50 focus:outline-none focus:border-primary-500 transition-colors"
            >
              <option value="">Select work type</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          {/* Salary Expectation */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Salary Expectation (Annual)
            </label>
            <select
              value={profile.salaryExpectation}
              onChange={(e) => setProfile({ ...profile, salaryExpectation: e.target.value })}
              className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-dark-50 focus:outline-none focus:border-primary-500 transition-colors"
            >
              <option value="">Select salary range</option>
              <option value="3-6 LPA">₹3-6 LPA</option>
              <option value="6-10 LPA">₹6-10 LPA</option>
              <option value="10-15 LPA">₹10-15 LPA</option>
              <option value="15-25 LPA">₹15-25 LPA</option>
              <option value="25+ LPA">₹25+ LPA</option>
            </select>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl font-semibold text-white flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            <span>Analyze My Career Path</span>
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default ProfileForm;
