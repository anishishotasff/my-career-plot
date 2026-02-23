import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, Lightbulb, ExternalLink, CheckCircle, Circle } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateRoadmap } from '../services/api';
import { Roadmap } from '../types';
import { initializeRoadmapProgress, updateSkillProgress, getRoadmapProgress } from '../utils/progressTracker';

const RoadmapView = () => {
  const { careerName } = useParams<{ careerName: string }>();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);

  // Helper function to get URL for resource names
  const getResourceUrl = (resourceName: string): string => {
    const resourceMap: { [key: string]: string } = {
      'freeCodeCamp': 'https://www.freecodecamp.org/',
      'MDN Web Docs': 'https://developer.mozilla.org/',
      'YouTube': 'https://www.youtube.com/',
      'Codecademy': 'https://www.codecademy.com/',
      'React Documentation': 'https://react.dev/',
      'Udemy': 'https://www.udemy.com/',
      'Coursera': 'https://www.coursera.org/',
      'Scrimba': 'https://scrimba.com/',
      'Vercel': 'https://vercel.com/docs',
      'Netlify': 'https://www.netlify.com/',
      'GitHub Actions': 'https://github.com/features/actions',
      'LeetCode': 'https://leetcode.com/',
      'Pluralsight': 'https://www.pluralsight.com/',
      'LinkedIn Learning': 'https://www.linkedin.com/learning/',
      'edX': 'https://www.edx.org/',
      'Khan Academy': 'https://www.khanacademy.org/',
      'W3Schools': 'https://www.w3schools.com/',
      'GeeksforGeeks': 'https://www.geeksforgeeks.org/',
      'HackerRank': 'https://www.hackerrank.com/',
      'Codewars': 'https://www.codewars.com/',
    };
    
    return resourceMap[resourceName] || `https://www.google.com/search?q=${encodeURIComponent(resourceName)}`;
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!careerName) {
        navigate('/dashboard');
        return;
      }

      try {
        const result = await generateRoadmap(decodeURIComponent(careerName));
        setRoadmap(result.roadmap);
        
        // Check if progress exists
        const existingProgress = getRoadmapProgress();
        if (existingProgress && existingProgress.careerName === decodeURIComponent(careerName)) {
          setCompletedSkills(existingProgress.completedSkills);
        } else {
          // Initialize new progress
          initializeRoadmapProgress(decodeURIComponent(careerName), result.roadmap);
        }
      } catch (error: any) {
        console.error('Error:', error);
        toast.error('Failed to generate roadmap');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [careerName, navigate]);

  const toggleSkillCompletion = (skill: string) => {
    const isCompleted = completedSkills.includes(skill);
    const updatedProgress = updateSkillProgress(skill, !isCompleted);
    
    if (updatedProgress) {
      setCompletedSkills(updatedProgress.completedSkills);
      toast.success(isCompleted ? 'Skill unmarked' : 'Skill completed! 🎉');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Navbar />
        <div className="pt-24">
          <LoadingSpinner message="Generating your personalized roadmap..." />
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return null;
  }

  const phases = [
    { key: 'phase_1', data: roadmap.phase_1, color: 'from-green-500 to-emerald-600' },
    { key: 'phase_2', data: roadmap.phase_2, color: 'from-blue-500 to-cyan-600' },
    { key: 'phase_3', data: roadmap.phase_3, color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-dark-400 hover:text-dark-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <h1 className="text-4xl font-bold mb-4">
            12-Month Roadmap: <span className="gradient-text">{decodeURIComponent(careerName || '')}</span>
          </h1>
          <p className="text-dark-300">
            Your personalized learning path to become a successful professional
          </p>
        </motion.div>

        {/* Phases */}
        <div className="space-y-6 mb-10">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.key}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold`}>
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-50">{phase.data.duration}</h3>
                  <p className="text-sm text-dark-400">{phase.data.focus}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-dark-300 mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Skills to Learn
                  </h4>
                  <ul className="space-y-2">
                    {phase.data.skills.map((skill, i) => {
                      const isCompleted = completedSkills.includes(skill);
                      return (
                        <li key={i} className="flex items-start space-x-2">
                          <button
                            onClick={() => toggleSkillCompletion(skill)}
                            className="mt-1 hover:scale-110 transition-transform"
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-dark-500" />
                            )}
                          </button>
                          <span className={`${isCompleted ? 'text-green-300 line-through' : 'text-dark-200'}`}>
                            {skill}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-dark-300 mb-3 flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learning Resources
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.data.resources.map((resource, i) => {
                      // Support both string and object formats
                      const isObject = typeof resource === 'object' && resource !== null;
                      const name = isObject ? resource.name : resource;
                      const url = isObject ? resource.url : getResourceUrl(resource);
                      
                      return (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-300 text-sm hover:bg-primary-500/20 hover:border-primary-500/40 transition-all flex items-center gap-1 group"
                        >
                          {name}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h3 className="text-xl font-bold text-dark-50 mb-4 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-400" />
            Recommended Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {roadmap.certifications.map((cert, i) => (
              <div
                key={i}
                className="px-4 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200"
              >
                {cert}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Project Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-dark-50 mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2 text-purple-400" />
            Real-World Project Ideas
          </h3>
          <div className="space-y-3">
            {roadmap.project_ideas.map((project, i) => (
              <div
                key={i}
                className="px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-200"
              >
                <span className="font-medium text-purple-300">Project {i + 1}:</span> {project}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => {
              localStorage.setItem(`roadmap_${careerName}`, JSON.stringify(roadmap));
              toast.success('Roadmap saved to local storage!');
            }}
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
          >
            Save Roadmap
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default RoadmapView;
