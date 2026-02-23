export interface UserProfile {
  skills: string[];
  interests: string[];
  education: string;
  workType: string;
  salaryExpectation: string;
  location: string;
}

export interface CareerMatch {
  career_name: string;
  match_percentage: number;
  why_match: string;
  required_skills: string[];
  skill_gap: string[];
  entry_salary_india: string;
  five_year_projection: string;
  market_demand: 'Low' | 'Medium' | 'High';
  automation_risk: 'Low' | 'Medium' | 'High';
}

export interface CareerResponse {
  career_matches: CareerMatch[];
}

export interface Resource {
  name: string;
  url: string;
}

export interface RoadmapPhase {
  duration: string;
  focus: string;
  skills: string[];
  resources: Resource[] | string[]; // Support both formats for backward compatibility
}

export interface Roadmap {
  phase_1: RoadmapPhase;
  phase_2: RoadmapPhase;
  phase_3: RoadmapPhase;
  certifications: string[];
  project_ideas: string[];
}

export interface RoadmapResponse {
  roadmap: Roadmap;
}

export interface ResumeAnalysis {
  detected_skills: string[];
  missing_skills: string[];
  ats_score: number;
  keyword_suggestions: string[];
  improvement_points: string[];
}
