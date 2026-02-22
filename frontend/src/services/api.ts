import axios from 'axios';
import { UserProfile, CareerResponse, RoadmapResponse, ResumeAnalysis } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds for AI responses
});

export const analyzeCareer = async (profile: UserProfile): Promise<CareerResponse> => {
  const response = await api.post<CareerResponse>('/career', profile);
  return response.data;
};

export const generateRoadmap = async (careerName: string): Promise<RoadmapResponse> => {
  const response = await api.post<RoadmapResponse>('/roadmap', { careerName });
  return response.data;
};

export const analyzeResume = async (
  resumeText: string,
  targetCareer: string
): Promise<ResumeAnalysis> => {
  const response = await api.post<ResumeAnalysis>('/resume', {
    resumeText,
    targetCareer,
  });
  return response.data;
};

export default api;
