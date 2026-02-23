import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileForm from './pages/ProfileForm';
import Dashboard from './pages/Dashboard';
import RoadmapView from './pages/RoadmapView';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Blog from './pages/Blog';
import JobFinder from './pages/JobFinder';
import CVGenerator from './pages/CVGenerator';
import UserProfile from './pages/UserProfile';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-950">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#0ea5e9',
                  secondary: '#f1f5f9',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#f1f5f9',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/my-profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roadmap/:careerName" element={<RoadmapView />} />
            <Route path="/resume" element={<ResumeAnalyzer />} />
            <Route path="/jobs" element={<JobFinder />} />
            <Route path="/cv-generator" element={<CVGenerator />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
          
          {/* AI Assistant - Available on all pages */}
          <AIAssistant />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
