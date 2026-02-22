import { Request, Response } from 'express';
import { getJobs, filterJobs } from '../services/jobScraperService';

export const getJobListings = async (req: Request, res: Response) => {
  try {
    const { search, category, location, refresh } = req.query;
    
    console.log('📋 Fetching job listings...');
    
    // Get jobs (force refresh if requested)
    const allJobs = await getJobs(refresh === 'true');
    
    // Filter jobs based on query parameters
    const filteredJobs = filterJobs(
      allJobs,
      search as string,
      category as string,
      location as string
    );
    
    res.json({
      success: true,
      count: filteredJobs.length,
      jobs: filteredJobs,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job listings',
      error: error.message,
    });
  }
};
