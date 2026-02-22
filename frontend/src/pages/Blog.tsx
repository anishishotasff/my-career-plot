import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Linkedin, Github, Globe, Rocket, Briefcase, GraduationCap } from 'lucide-react';

const Blog = () => {
  const founders = [
    {
      name: 'Anish Debnath',
      role: 'Founder & Full Stack Developer',
      linkedin: 'https://www.linkedin.com/in/anishishotasff',
      github: 'https://github.com/anishishotasff',
      portfolio: 'https://anishishotasf.vercel.app/',
      image: '👨‍💻',
    },
    {
      name: 'Pilat Debbarma',
      role: 'Co-Founder & Full Stack Developer',
      linkedin: 'https://www.linkedin.com/in/pilat-debbarma-a893763aa',
      github: 'https://github.com/Pilat143',
      image: '👨‍💻',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Story</span>
          </h1>
          <p className="text-xl text-dark-300">
            Building the future of career guidance for everyone
          </p>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-3xl font-bold text-dark-50 mb-6">
            Empowering Every Career Path with Technology
          </h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-dark-300 text-lg leading-relaxed mb-6">
              In today's rapidly evolving world, career guidance shouldn't be limited to just one field. Whether you're 
              aspiring to be a doctor, engineer, business leader, artist, teacher, or anything in between, you deserve 
              personalized, data-driven guidance. As full stack developers, we built My Career Plot to serve everyone—from 
              medical students to business professionals, from tech enthusiasts to creative minds.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-dark-900/50 rounded-xl p-6 border border-primary-500/20">
                <GraduationCap className="w-8 h-8 text-primary-400 mb-3" />
                <h3 className="text-lg font-semibold text-dark-50 mb-2">All Industries</h3>
                <p className="text-dark-400 text-sm">
                  Technology, Healthcare, Business, Finance, Arts, Education, Law, and more
                </p>
              </div>
              
              <div className="bg-dark-900/50 rounded-xl p-6 border border-purple-500/20">
                <Rocket className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-lg font-semibold text-dark-50 mb-2">AI-Powered Insights</h3>
                <p className="text-dark-400 text-sm">
                  Smart career matching and personalized roadmaps for every field
                </p>
              </div>
              
              <div className="bg-dark-900/50 rounded-xl p-6 border border-pink-500/20">
                <Briefcase className="w-8 h-8 text-pink-400 mb-3" />
                <h3 className="text-lg font-semibold text-dark-50 mb-2">Job Opportunities</h3>
                <p className="text-dark-400 text-sm">
                  Discover relevant job openings across all sectors in India
                </p>
              </div>
            </div>

            <p className="text-dark-300 text-lg leading-relaxed mb-6">
              My Career Plot was born from a simple observation: career guidance in India is often generic, outdated, 
              and disconnected from market realities. We saw talented individuals from all backgrounds—medical students, 
              business graduates, engineers, artists, teachers—struggling to navigate their career paths, not because 
              they lacked potential, but because they lacked personalized, data-driven guidance.
            </p>

            <p className="text-dark-300 text-lg leading-relaxed mb-6">
              As full stack developers, we understood that solving this problem required more than just good intentions. 
              It demanded a robust technical architecture that could handle complex AI processing across multiple domains, 
              deliver real-time insights for diverse career paths, and scale to serve thousands of users from every field. 
              We built My Career Plot using modern technologies—React for a responsive frontend, Node.js for a powerful 
              backend, and Google's Gemini AI for intelligent career analysis across all industries.
            </p>

            <blockquote className="border-l-4 border-primary-500 pl-6 my-8 italic text-dark-200">
              "The best way to predict the future is to create it. We're not just building an app; 
              we're building a platform that empowers individuals from every field to take control of their career destiny."
            </blockquote>

            <p className="text-dark-300 text-lg leading-relaxed mb-6">
              Our journey as full stack developers has taught us that great products are built at the intersection of 
              technical excellence and user empathy. Whether you're a medical student looking for specialization guidance, 
              a business graduate exploring entrepreneurship, a teacher seeking career advancement, or a tech enthusiast 
              planning your next move, every feature we build is driven by one question: "How does this help someone build 
              a better career?"
            </p>

            <p className="text-dark-300 text-lg leading-relaxed">
              This is just the beginning. We're committed to continuously improving My Career Plot, adding new features 
              across all career domains, expanding our job finder capabilities, and enhancing our AI to serve the entire 
              Indian job market better. Join us on this journey as we revolutionize career guidance for everyone, one user at a time.
            </p>
          </div>
        </motion.article>

        {/* Founders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            <span className="gradient-text">Meet the Team</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass glass-hover rounded-2xl p-8"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{founder.image}</div>
                  <h3 className="text-2xl font-bold text-dark-50 mb-2">{founder.name}</h3>
                  <p className="text-primary-400 font-medium">{founder.role}</p>
                </div>

                <div className="flex justify-center space-x-4">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center transition-all duration-300 group"
                  >
                    <Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </a>
                  
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 flex items-center justify-center transition-all duration-300 group"
                  >
                    <Github className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform" />
                  </a>
                  
                  {founder.portfolio && (
                    <a
                      href={founder.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 flex items-center justify-center transition-all duration-300 group"
                    >
                      <Globe className="w-5 h-5 text-primary-400 group-hover:scale-110 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-center mb-6 gradient-text">Built With</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Google Gemini AI', 'Framer Motion'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-dark-900/50 border border-primary-500/20 rounded-lg text-dark-300 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
