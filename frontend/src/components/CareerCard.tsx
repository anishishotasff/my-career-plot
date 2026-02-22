import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Briefcase, ArrowRight } from 'lucide-react';
import { CareerMatch } from '../types';
import { useNavigate } from 'react-router-dom';

interface CareerCardProps {
  career: CareerMatch;
  index: number;
}

const CareerCard = ({ career, index }: CareerCardProps) => {
  const navigate = useNavigate();

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'High':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass glass-hover rounded-2xl p-6 space-y-4 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-dark-50 mb-2">{career.career_name}</h3>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDemandColor(career.market_demand)}`}>
              {career.market_demand} Demand
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold gradient-text">{career.match_percentage}%</div>
          <div className="text-xs text-dark-400">Match</div>
        </div>
      </div>

      {/* Match Progress Bar */}
      <div className="relative h-2 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${career.match_percentage}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          className="absolute h-full bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"
        />
      </div>

      {/* Why Match */}
      <p className="text-dark-300 text-sm leading-relaxed">{career.why_match}</p>

      {/* Salary Info */}
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
        <div>
          <div className="text-xs text-dark-400 mb-1">Entry Salary</div>
          <div className="text-lg font-semibold text-primary-400">{career.entry_salary_india}</div>
        </div>
        <div>
          <div className="text-xs text-dark-400 mb-1">5-Year Projection</div>
          <div className="text-lg font-semibold text-purple-400">{career.five_year_projection}</div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-3">
        <div>
          <div className="text-xs text-dark-400 mb-2 flex items-center">
            <Briefcase className="w-3 h-3 mr-1" />
            Required Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {career.required_skills.slice(0, 5).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-primary-500/10 text-primary-300 rounded-md text-xs border border-primary-500/20"
              >
                {skill}
              </span>
            ))}
            {career.required_skills.length > 5 && (
              <span className="px-2 py-1 text-dark-400 text-xs">
                +{career.required_skills.length - 5} more
              </span>
            )}
          </div>
        </div>

        {career.skill_gap.length > 0 && (
          <div>
            <div className="text-xs text-dark-400 mb-2 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Skills to Learn
            </div>
            <div className="flex flex-wrap gap-2">
              {career.skill_gap.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-yellow-500/10 text-yellow-300 rounded-md text-xs border border-yellow-500/20"
                >
                  {skill}
                </span>
              ))}
              {career.skill_gap.length > 4 && (
                <span className="px-2 py-1 text-dark-400 text-xs">
                  +{career.skill_gap.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Automation Risk */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className={`w-4 h-4 ${getRiskColor(career.automation_risk)}`} />
          <span className="text-xs text-dark-400">
            Automation Risk: <span className={getRiskColor(career.automation_risk)}>{career.automation_risk}</span>
          </span>
        </div>
      </div>

      {/* View Roadmap Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/roadmap/${encodeURIComponent(career.career_name)}`)}
        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-medium text-white flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
      >
        <span>View Roadmap</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

export default CareerCard;
