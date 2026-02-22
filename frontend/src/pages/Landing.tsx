import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Target, Zap, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'AI Career Matching',
      description: 'Get top 3 career matches across all fields - Tech, Medical, Business, Arts & more',
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Real-time salary data, demand ratings across all industries in India',
    },
    {
      icon: Sparkles,
      title: '12-Month Roadmap',
      description: 'Structured learning path with certifications for any career field',
    },
    {
      icon: Zap,
      title: 'Job Finder',
      description: 'Discover opportunities across Technology, Healthcare, Business, Finance & more',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/10 to-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium">
              🚀 AI-Powered Career Intelligence
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Career Journey
            <br />
            <span className="gradient-text">Powered by AI</span>
          </h1>

          <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
            Get personalized career recommendations across all fields - Technology, Healthcare, Business, 
            Finance, Education, Arts & more. Tailored for the Indian job market.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile')}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl font-semibold text-white flex items-center space-x-2 hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/jobs')}
              className="px-8 py-4 glass glass-hover rounded-xl font-semibold text-dark-50"
            >
              Browse Jobs
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass glass-hover rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-dark-50 mb-2">{feature.title}</h3>
                <p className="text-sm text-dark-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">All Fields</div>
              <div className="text-dark-400">Tech, Medical, Business & More</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">India-Focused</div>
              <div className="text-dark-400">Market Insights & Salaries</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">Job Finder</div>
              <div className="text-dark-400">Opportunities Across Industries</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
