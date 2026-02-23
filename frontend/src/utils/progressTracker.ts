// Utility functions for tracking user progress

export interface RoadmapProgress {
  careerName: string;
  roadmap: any;
  progress: {
    phase1: number;
    phase2: number;
    phase3: number;
    overall: number;
  };
  completedSkills: string[];
  startDate: string;
  lastUpdated: string;
}

export const initializeRoadmapProgress = (careerName: string, roadmap: any): RoadmapProgress => {
  const progress: RoadmapProgress = {
    careerName,
    roadmap,
    progress: {
      phase1: 0,
      phase2: 0,
      phase3: 0,
      overall: 0,
    },
    completedSkills: [],
    startDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };

  localStorage.setItem('roadmapProgress', JSON.stringify(progress));
  return progress;
};

export const updateSkillProgress = (skill: string, completed: boolean): RoadmapProgress | null => {
  const stored = localStorage.getItem('roadmapProgress');
  if (!stored) return null;

  const progress: RoadmapProgress = JSON.parse(stored);

  if (completed && !progress.completedSkills.includes(skill)) {
    progress.completedSkills.push(skill);
  } else if (!completed) {
    progress.completedSkills = progress.completedSkills.filter(s => s !== skill);
  }

  // Calculate progress for each phase
  const phase1Skills = progress.roadmap.phase_1?.skills || [];
  const phase2Skills = progress.roadmap.phase_2?.skills || [];
  const phase3Skills = progress.roadmap.phase_3?.skills || [];

  const phase1Completed = phase1Skills.filter((s: string) => progress.completedSkills.includes(s)).length;
  const phase2Completed = phase2Skills.filter((s: string) => progress.completedSkills.includes(s)).length;
  const phase3Completed = phase3Skills.filter((s: string) => progress.completedSkills.includes(s)).length;

  progress.progress.phase1 = phase1Skills.length > 0 ? Math.round((phase1Completed / phase1Skills.length) * 100) : 0;
  progress.progress.phase2 = phase2Skills.length > 0 ? Math.round((phase2Completed / phase2Skills.length) * 100) : 0;
  progress.progress.phase3 = phase3Skills.length > 0 ? Math.round((phase3Completed / phase3Skills.length) * 100) : 0;

  const totalSkills = phase1Skills.length + phase2Skills.length + phase3Skills.length;
  const totalCompleted = progress.completedSkills.length;
  progress.progress.overall = totalSkills > 0 ? Math.round((totalCompleted / totalSkills) * 100) : 0;

  progress.lastUpdated = new Date().toISOString();

  localStorage.setItem('roadmapProgress', JSON.stringify(progress));
  return progress;
};

export const getRoadmapProgress = (): RoadmapProgress | null => {
  const stored = localStorage.getItem('roadmapProgress');
  return stored ? JSON.parse(stored) : null;
};

export const resetRoadmapProgress = (): void => {
  localStorage.removeItem('roadmapProgress');
};

export const calculateDaysInProgress = (startDate: string): number => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getPhaseStatus = (progress: number): { status: string; color: string } => {
  if (progress === 100) return { status: 'Completed', color: 'text-green-400' };
  if (progress >= 75) return { status: 'Almost There', color: 'text-blue-400' };
  if (progress >= 50) return { status: 'In Progress', color: 'text-yellow-400' };
  if (progress >= 25) return { status: 'Getting Started', color: 'text-orange-400' };
  if (progress > 0) return { status: 'Just Started', color: 'text-purple-400' };
  return { status: 'Not Started', color: 'text-dark-400' };
};
