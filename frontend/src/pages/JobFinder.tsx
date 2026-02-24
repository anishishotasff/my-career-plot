import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, MapPin, Briefcase, Clock, DollarSign, Building, ExternalLink, Filter, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  description: string;
  skills: string[];
  postedDate: string;
  applyUrl: string;
  source: string;
}

const JobFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const categories = ['All', 'Technology', 'Healthcare', 'Business', 'Finance', 'Education', 'Marketing', 'Design', 'Sales'];
  const locations = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Remote'];

  const fetchJobs = async (refresh: boolean = false) => {
    try {
      setLoading(true);
      const response = await api.get(`/jobs`, {
        params: {
          search: searchQuery || undefined,
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          location: selectedLocation !== 'All' ? selectedLocation : undefined,
          refresh: refresh ? 'true' : undefined,
        },
      });

      if (response.data.success) {
        setJobs(response.data.jobs);
        setLastUpdated(new Date(response.data.lastUpdated).toLocaleString());
        
        if (refresh) {
          toast.success('Jobs refreshed successfully!');
        }
      }
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs. Showing sample data.');
      
      // Fallback to sample data if API fails
      setJobs([
        {
          id: '1',
          title: 'Full Stack Developer',
          company: 'Tech Innovations Pvt Ltd',
          location: 'Bangalore',
          experience: '2-5 years',
          salary: '8-12 LPA',
          description: 'Looking for experienced full stack developer with React and Node.js expertise',
          skills: ['React', 'Node.js', 'TypeScript'],
          postedDate: '2 days ago',
          applyUrl: 'https://www.naukri.com/full-stack-developer-jobs',
          source: 'Naukri.com',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    fetchJobs();
  };

  const handleRefresh = () => {
    fetchJobs(true);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Find Your Dream Job</span>
          </h1>
          <p className="text-xl text-dark-300 mb-3">
            Discover opportunities across all industries in India
          </p>
          <div className="flex items-center justify-center gap-4">
            <p className="text-sm text-dark-400">
              Jobs sourced from Naukri.com • Updated daily
            </p>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-1 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg text-sm text-primary-400 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
          {lastUpdated && (
            <p className="text-xs text-dark-500 mt-2">Last updated: {lastUpdated}</p>
          )}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
            >
              Search Jobs
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary-400" />
            <h3 className="text-lg font-semibold text-dark-50">Filters</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm text-dark-400 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 focus:outline-none focus:border-primary-500 transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm text-dark-400 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded-xl text-dark-50 focus:outline-none focus:border-primary-500 transition-colors"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-dark-300">
            Showing <span className="text-primary-400 font-semibold">{jobs.length}</span> jobs
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-50 mb-1">{job.title}</h3>
                      <div className="flex items-center gap-2 text-dark-400">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-dark-300 mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-dark-900/50 rounded-lg text-sm text-dark-300">
                      <MapPin className="w-4 h-4 text-primary-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-dark-900/50 rounded-lg text-sm text-dark-300">
                      <Clock className="w-4 h-4 text-purple-400" />
                      {job.experience}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-dark-900/50 rounded-lg text-sm text-dark-300">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      {job.salary}
                    </div>
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-lg text-sm text-primary-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="px-3 py-1 bg-dark-900/50 rounded-lg text-xs text-dark-400">
                      via {job.source}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:items-end">
                  <span className="text-sm text-dark-400">{job.postedDate}</span>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 flex items-center gap-2"
                  >
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-dark-400 text-lg">No jobs found matching your criteria</p>
            <p className="text-dark-500 mt-2">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>
      )}
    </div>
  );
};

export default JobFinder;
