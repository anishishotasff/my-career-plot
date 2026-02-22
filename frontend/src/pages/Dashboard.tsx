import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import CareerCard from '../components/CareerCard';
import { CareerMatch } from '../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState<CareerMatch[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('careerMatches');
    if (stored) {
      setCareers(JSON.parse(stored));
    } else {
      navigate('/profile');
    }
  }, [navigate]);

  if (careers.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 text-dark-400 hover:text-dark-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </button>

          <h1 className="text-4xl font-bold mb-4">
            Your Career <span className="gradient-text">Matches</span>
          </h1>
          <p className="text-dark-300">
            Based on your profile, here are the top 3 career paths recommended for you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-6">
          {careers.map((career, index) => (
            <CareerCard key={index} career={career} index={index} />
          ))}
        </div>

        {/* Additional Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 glass rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-semibold mb-4">Want to optimize your resume?</h3>
          <p className="text-dark-400 mb-6">
            Get ATS score and personalized suggestions to improve your resume
          </p>
          <button
            onClick={() => navigate('/resume')}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
          >
            Analyze Resume
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
