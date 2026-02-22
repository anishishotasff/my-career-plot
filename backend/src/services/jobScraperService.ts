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

// Cache for storing jobs
let jobsCache: Job[] = [];
let lastUpdated: Date | null = null;

// Generate realistic job data (simulating Naukri.com data)
const generateJobData = (): Job[] => {
  const jobs: Job[] = [
    // Technology Jobs
    {
      id: 'naukri-tech-1',
      title: 'Full Stack Developer',
      company: 'Infosys Limited',
      location: 'Bangalore',
      experience: '2-5 years',
      salary: '8-12 LPA',
      description: 'Looking for experienced full stack developer with React, Node.js, and MongoDB expertise. Must have strong problem-solving skills.',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'REST API'],
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/full-stack-developer-jobs-in-bangalore',
      source: 'Naukri.com',
    },
    {
      id: 'naukri-tech-2',
      title: 'Data Scientist',
      company: 'Wipro Technologies',
      location: 'Mumbai',
      experience: '3-6 years',
      salary: '10-18 LPA',
      description: 'Seeking data scientist with expertise in machine learning, Python, and statistical analysis. Experience with AI/ML projects required.',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/data-scientist-jobs-in-mumbai',
      source: 'Naukri.com',
    },
    {
      id: 'naukri-tech-3',
      title: 'DevOps Engineer',
      company: 'TCS',
      location: 'Pune',
      experience: '3-7 years',
      salary: '9-15 LPA',
      description: 'DevOps engineer needed for cloud infrastructure management. AWS/Azure certification preferred.',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/devops-engineer-jobs-in-pune',
      source: 'Naukri.com',
    },
    
    // Healthcare Jobs
    {
      id: 'naukri-health-1',
      title: 'Medical Officer',
      company: 'Apollo Hospitals',
      location: 'Mumbai',
      experience: '2-5 years',
      salary: '10-15 LPA',
      description: 'MBBS required with 2+ years experience in general medicine. Must have valid medical license.',
      skills: ['MBBS', 'Patient Care', 'Emergency Medicine', 'Clinical Skills'],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/medical-officer-jobs-in-mumbai',
      source: 'Naukri.com',
    },
    {
      id: 'naukri-health-2',
      title: 'Senior Nurse',
      company: 'Fortis Healthcare',
      location: 'Delhi',
      experience: '3-8 years',
      salary: '5-8 LPA',
      description: 'B.Sc Nursing with ICU/CCU experience. Night shift flexibility required.',
      skills: ['Nursing', 'Patient Care', 'ICU', 'Emergency Care'],
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/nurse-jobs-in-delhi',
      source: 'Naukri.com',
    },
    
    // Business Jobs
    {
      id: 'naukri-business-1',
      title: 'Business Analyst',
      company: 'Deloitte India',
      location: 'Delhi',
      experience: '2-5 years',
      salary: '6-10 LPA',
      description: 'MBA preferred with strong analytical and communication skills. Experience in consulting preferred.',
      skills: ['Business Analysis', 'SQL', 'Excel', 'PowerPoint', 'Stakeholder Management'],
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/business-analyst-jobs-in-delhi',
      source: 'Naukri.com',
    },
    {
      id: 'naukri-business-2',
      title: 'Management Consultant',
      company: 'McKinsey & Company',
      location: 'Mumbai',
      experience: '4-8 years',
      salary: '15-25 LPA',
      description: 'Top-tier MBA required. Experience in strategy consulting and client management.',
      skills: ['Strategy', 'Consulting', 'Business Planning', 'Client Management'],
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/management-consultant-jobs-in-mumbai',
      source: 'Naukri.com',
    },
    
    // Finance Jobs
    {
      id: 'naukri-finance-1',
      title: 'Financial Analyst',
      company: 'HDFC Bank',
      location: 'Pune',
      experience: '2-4 years',
      salary: '5-8 LPA',
      description: 'CA/CFA with expertise in financial modeling and analysis. Banking experience preferred.',
      skills: ['Financial Analysis', 'Excel', 'Financial Modeling', 'Accounting'],
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/financial-analyst-jobs-in-pune',
      source: 'Naukri.com',
    },
    {
      id: 'naukri-finance-2',
      title: 'Investment Banker',
      company: 'ICICI Securities',
      location: 'Mumbai',
      experience: '3-6 years',
      salary: '12-20 LPA',
      description: 'MBA Finance with strong knowledge of capital markets and investment strategies.',
      skills: ['Investment Banking', 'Financial Markets', 'Valuation', 'M&A'],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/investment-banker-jobs-in-mumbai',
      source: 'Naukri.com',
    },
    
    // Education Jobs
    {
      id: 'naukri-edu-1',
      title: 'Senior Teacher - Mathematics',
      company: 'Delhi Public School',
      location: 'Hyderabad',
      experience: '5-10 years',
      salary: '4-6 LPA',
      description: 'B.Ed required with 5+ years teaching experience for grades 9-12. Strong subject knowledge essential.',
      skills: ['Teaching', 'Mathematics', 'Curriculum Planning', 'Student Assessment'],
      postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/teacher-jobs-in-hyderabad',
      source: 'Naukri.com',
    },
    {
      id: 'naukri-edu-2',
      title: 'Academic Coordinator',
      company: 'Ryan International School',
      location: 'Bangalore',
      experience: '7-12 years',
      salary: '6-9 LPA',
      description: 'M.Ed with experience in curriculum development and teacher training.',
      skills: ['Education Management', 'Curriculum Development', 'Teacher Training'],
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/academic-coordinator-jobs-in-bangalore',
      source: 'Naukri.com',
    },
    
    // Marketing Jobs
    {
      id: 'naukri-marketing-1',
      title: 'Digital Marketing Manager',
      company: 'Flipkart',
      location: 'Bangalore',
      experience: '3-6 years',
      salary: '7-11 LPA',
      description: 'Experience in SEO, SEM, social media marketing and analytics. E-commerce experience preferred.',
      skills: ['Digital Marketing', 'SEO', 'SEM', 'Google Analytics', 'Social Media'],
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/digital-marketing-manager-jobs-in-bangalore',
      source: 'Naukri.com',
    },
    {
      id: 'naukri-marketing-2',
      title: 'Brand Manager',
      company: 'Hindustan Unilever',
      location: 'Mumbai',
      experience: '4-7 years',
      salary: '10-16 LPA',
      description: 'MBA Marketing with experience in brand strategy and product launches.',
      skills: ['Brand Management', 'Marketing Strategy', 'Product Launch', 'Market Research'],
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/brand-manager-jobs-in-mumbai',
      source: 'Naukri.com',
    },
    
    // Design Jobs
    {
      id: 'naukri-design-1',
      title: 'UI/UX Designer',
      company: 'Zomato',
      location: 'Remote',
      experience: '2-5 years',
      salary: '6-9 LPA',
      description: 'Portfolio required. Proficiency in Figma, Adobe XD, and user research methodologies.',
      skills: ['UI Design', 'UX Design', 'Figma', 'Adobe XD', 'User Research'],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/ui-ux-designer-jobs',
      source: 'Naukri.com',
    },
    {
      id: 'naukri-design-2',
      title: 'Graphic Designer',
      company: 'Ogilvy India',
      location: 'Delhi',
      experience: '2-4 years',
      salary: '4-7 LPA',
      description: 'Creative designer needed for advertising campaigns. Adobe Creative Suite expertise required.',
      skills: ['Graphic Design', 'Adobe Photoshop', 'Illustrator', 'InDesign', 'Branding'],
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/graphic-designer-jobs-in-delhi',
      source: 'Naukri.com',
    },
    
    // Sales Jobs
    {
      id: 'naukri-sales-1',
      title: 'Sales Executive',
      company: 'Tata Motors',
      location: 'Chennai',
      experience: '1-3 years',
      salary: '3-5 LPA + Incentives',
      description: 'Strong communication skills, target-oriented with automotive industry knowledge preferred.',
      skills: ['Sales', 'Communication', 'Negotiation', 'Customer Relationship'],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/sales-executive-jobs-in-chennai',
      source: 'Naukri.com',
    },
    {
      id: 'naukri-sales-2',
      title: 'Business Development Manager',
      company: 'Byju\'s',
      location: 'Bangalore',
      experience: '3-6 years',
      salary: '6-10 LPA + Incentives',
      description: 'B2B sales experience required. EdTech industry experience is a plus.',
      skills: ['Business Development', 'B2B Sales', 'Lead Generation', 'Client Acquisition'],
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      applyUrl: 'https://www.naukri.com/business-development-manager-jobs-in-bangalore',
      source: 'Naukri.com',
    },
  ];

  return jobs;
};

// Function to get jobs (with daily refresh simulation)
export const getJobs = async (forceRefresh: boolean = false): Promise<Job[]> => {
  const now = new Date();
  const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours

  // Check if cache needs refresh
  if (
    !forceRefresh &&
    jobsCache.length > 0 &&
    lastUpdated &&
    now.getTime() - lastUpdated.getTime() < cacheExpiry
  ) {
    console.log('📦 Returning cached jobs');
    return jobsCache;
  }

  console.log('🔄 Generating fresh job data...');
  
  // Generate new job data (simulating daily updates from Naukri.com)
  jobsCache = generateJobData();
  lastUpdated = now;
  
  console.log(`✅ Updated job cache with ${jobsCache.length} jobs`);
  return jobsCache;
};

// Function to filter jobs
export const filterJobs = (
  jobs: Job[],
  searchQuery?: string,
  category?: string,
  location?: string
): Job[] => {
  return jobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !location || location === 'All' ||
      job.location.toLowerCase().includes(location.toLowerCase());
    
    // Category matching based on job title and skills
    const matchesCategory = !category || category === 'All' || (() => {
      const jobText = `${job.title} ${job.skills.join(' ')}`.toLowerCase();
      
      switch (category) {
        case 'Technology':
          return /software|developer|engineer|programmer|tech|it|data|devops/.test(jobText);
        case 'Healthcare':
          return /medical|doctor|nurse|healthcare|hospital|clinical/.test(jobText);
        case 'Business':
          return /business|management|consultant|strategy|operations/.test(jobText);
        case 'Finance':
          return /finance|accounting|bank|investment|financial/.test(jobText);
        case 'Education':
          return /teacher|education|professor|instructor|academic|coordinator/.test(jobText);
        case 'Marketing':
          return /marketing|digital|seo|brand|advertising|social/.test(jobText);
        case 'Design':
          return /design|ui|ux|graphic|creative|visual/.test(jobText);
        case 'Sales':
          return /sales|business development|account|client/.test(jobText);
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesLocation && matchesCategory;
  });
};

// Initialize job cache on server start
export const initializeJobCache = async () => {
  console.log('🚀 Initializing job cache...');
  await getJobs(true);
};

// Schedule daily updates
export const scheduleDailyJobUpdate = () => {
  setInterval(async () => {
    console.log('⏰ Running scheduled job update...');
    await getJobs(true);
  }, 24 * 60 * 60 * 1000);
  
  console.log('✅ Daily job update scheduled (every 24 hours)');
};
