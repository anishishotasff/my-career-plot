import { callGeminiAPI } from '../config/gemini';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    grade: string;
  }>;
  skills: string[];
  certifications: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
  }>;
}

export const enhanceCVWithAI = async (cvData: CVData): Promise<CVData> => {
  const systemPrompt = `You are a professional CV/Resume writer. Enhance the provided CV data by:
1. Improving the professional summary to be more impactful
2. Rewriting job descriptions to be more achievement-focused with metrics
3. Suggesting additional relevant skills
4. Improving project descriptions

Return the enhanced data in the same JSON structure. Keep all original information but make it more professional and ATS-friendly.`;

  const userPrompt = `Enhance this CV data:\n\n${JSON.stringify(cvData, null, 2)}\n\nReturn only the enhanced JSON data, no explanations.`;

  try {
    const response = await callGeminiAPI(systemPrompt, userPrompt);
    
    // Try to parse JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const enhancedData = JSON.parse(jsonMatch[0]);
      return enhancedData;
    }
    
    // If parsing fails, return original with improved summary
    return {
      ...cvData,
      summary: cvData.summary || 'Results-driven professional with proven expertise in delivering high-quality solutions. Strong analytical and problem-solving skills with a track record of success.',
    };
  } catch (error) {
    console.error('Error enhancing CV:', error);
    
    // Return enhanced version with fallback improvements
    return {
      ...cvData,
      summary: cvData.summary || `Dynamic professional with expertise in ${cvData.skills.slice(0, 3).join(', ')}. Proven track record of delivering results and driving innovation.`,
      skills: [...new Set([...cvData.skills, 'Problem Solving', 'Team Collaboration', 'Communication'])],
    };
  }
};

export const getSuggestions = async (
  text: string,
  context?: { role?: string; skills?: string[] }
): Promise<string[]> => {
  const systemPrompt = `You are a professional CV writing assistant. Generate 3 concise, professional suggestions to complete or improve the user's text. 

Guidelines:
- Make suggestions specific and actionable
- Use professional language
- Keep each suggestion under 100 characters
- Focus on achievements and impact
- Use action verbs and quantifiable results when possible
- Return ONLY a JSON array of strings, no other text

Example format: ["suggestion 1", "suggestion 2", "suggestion 3"]`;

  let userPrompt = `User is writing: "${text}"\n\n`;
  
  if (context?.role) {
    userPrompt += `Their role: ${context.role}\n`;
  }
  
  if (context?.skills && context.skills.length > 0) {
    userPrompt += `Their skills: ${context.skills.join(', ')}\n`;
  }
  
  userPrompt += '\nProvide 3 professional suggestions to complete or improve this text. Return ONLY a JSON array.';

  try {
    const response = await callGeminiAPI(systemPrompt, userPrompt);
    
    // Try to extract JSON array from response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const suggestions = JSON.parse(jsonMatch[0]);
      return suggestions.slice(0, 3);
    }
    
    // Fallback suggestions based on context
    return generateFallbackSuggestions(text, context);
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return generateFallbackSuggestions(text, context);
  }
};

const generateFallbackSuggestions = (
  text: string,
  context?: { role?: string; skills?: string[] }
): string[] => {
  const lowerText = text.toLowerCase();
  
  // Professional summary suggestions
  if (lowerText.includes('professional') || lowerText.includes('experienced') || text.length < 50) {
    return [
      'Results-driven professional with proven expertise in delivering high-quality solutions',
      'Dynamic leader with strong analytical and problem-solving skills',
      'Innovative professional with a track record of driving business growth',
    ];
  }
  
  // Achievement-focused suggestions
  if (lowerText.includes('led') || lowerText.includes('managed') || lowerText.includes('developed')) {
    return [
      'Led cross-functional teams to deliver projects 20% ahead of schedule',
      'Managed stakeholder relationships resulting in 95% client satisfaction',
      'Developed innovative solutions that increased efficiency by 30%',
    ];
  }
  
  // Skills-based suggestions
  if (context?.skills && context.skills.length > 0) {
    const topSkills = context.skills.slice(0, 3).join(', ');
    return [
      `Expertise in ${topSkills} with proven ability to deliver results`,
      `Strong technical skills in ${topSkills} and agile methodologies`,
      `Proficient in ${topSkills} with focus on scalable solutions`,
    ];
  }
  
  // Generic professional suggestions
  return [
    'Proven track record of exceeding performance targets and driving innovation',
    'Strong communication and leadership skills with ability to mentor teams',
    'Detail-oriented professional committed to continuous learning and improvement',
  ];
};

export const generateCVPDF = async (cvData: CVData): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileName = `cv_${Date.now()}.pdf`;
      const filePath = path.join(uploadsDir, fileName);
      
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);
      
      doc.pipe(stream);

      // Header with name
      doc.fontSize(24)
         .fillColor('#0ea5e9')
         .text(cvData.personalInfo.fullName, { align: 'center' });
      
      doc.moveDown(0.5);

      // Contact Information
      doc.fontSize(10)
         .fillColor('#64748b')
         .text([
           cvData.personalInfo.email,
           cvData.personalInfo.phone,
           cvData.personalInfo.location,
         ].filter(Boolean).join(' | '), { align: 'center' });

      if (cvData.personalInfo.linkedin || cvData.personalInfo.portfolio) {
        doc.text([
          cvData.personalInfo.linkedin,
          cvData.personalInfo.portfolio,
        ].filter(Boolean).join(' | '), { align: 'center' });
      }

      doc.moveDown(1);

      // Professional Summary
      if (cvData.summary) {
        doc.fontSize(14)
           .fillColor('#0ea5e9')
           .text('PROFESSIONAL SUMMARY', { underline: true });
        
        doc.moveDown(0.5);
        doc.fontSize(10)
           .fillColor('#1e293b')
           .text(cvData.summary, { align: 'justify' });
        
        doc.moveDown(1);
      }

      // Skills
      if (cvData.skills.length > 0) {
        doc.fontSize(14)
           .fillColor('#0ea5e9')
           .text('SKILLS', { underline: true });
        
        doc.moveDown(0.5);
        doc.fontSize(10)
           .fillColor('#1e293b')
           .text(cvData.skills.join(' • '), { align: 'left' });
        
        doc.moveDown(1);
      }

      // Experience
      if (cvData.experience.length > 0 && cvData.experience[0].title) {
        doc.fontSize(14)
           .fillColor('#0ea5e9')
           .text('WORK EXPERIENCE', { underline: true });
        
        doc.moveDown(0.5);

        cvData.experience.forEach((exp) => {
          if (exp.title) {
            doc.fontSize(12)
               .fillColor('#1e293b')
               .text(exp.title, { continued: true })
               .fontSize(10)
               .fillColor('#64748b')
               .text(` | ${exp.company}`, { continued: false });
            
            doc.fontSize(9)
               .fillColor('#94a3b8')
               .text(`${exp.location} | ${exp.startDate} - ${exp.endDate || 'Present'}`);
            
            if (exp.description) {
              doc.moveDown(0.3);
              doc.fontSize(10)
                 .fillColor('#1e293b')
                 .text(exp.description, { align: 'justify' });
            }
            
            doc.moveDown(0.8);
          }
        });
      }

      // Education
      if (cvData.education.length > 0 && cvData.education[0].degree) {
        doc.fontSize(14)
           .fillColor('#0ea5e9')
           .text('EDUCATION', { underline: true });
        
        doc.moveDown(0.5);

        cvData.education.forEach((edu) => {
          if (edu.degree) {
            doc.fontSize(12)
               .fillColor('#1e293b')
               .text(edu.degree, { continued: true })
               .fontSize(10)
               .fillColor('#64748b')
               .text(` | ${edu.institution}`, { continued: false });
            
            doc.fontSize(9)
               .fillColor('#94a3b8')
               .text(`${edu.year}${edu.grade ? ` | ${edu.grade}` : ''}`);
            
            doc.moveDown(0.8);
          }
        });
      }

      // Projects
      if (cvData.projects.length > 0 && cvData.projects[0].name) {
        doc.fontSize(14)
           .fillColor('#0ea5e9')
           .text('PROJECTS', { underline: true });
        
        doc.moveDown(0.5);

        cvData.projects.forEach((project) => {
          if (project.name) {
            doc.fontSize(12)
               .fillColor('#1e293b')
               .text(project.name);
            
            if (project.technologies) {
              doc.fontSize(9)
                 .fillColor('#94a3b8')
                 .text(`Technologies: ${project.technologies}`);
            }
            
            if (project.description) {
              doc.moveDown(0.3);
              doc.fontSize(10)
                 .fillColor('#1e293b')
                 .text(project.description, { align: 'justify' });
            }
            
            doc.moveDown(0.8);
          }
        });
      }

      // Certifications
      if (cvData.certifications.length > 0) {
        doc.fontSize(14)
           .fillColor('#0ea5e9')
           .text('CERTIFICATIONS', { underline: true });
        
        doc.moveDown(0.5);
        cvData.certifications.forEach((cert) => {
          doc.fontSize(10)
             .fillColor('#1e293b')
             .text(`• ${cert}`);
        });
      }

      doc.end();

      stream.on('finish', () => {
        resolve(`/uploads/${fileName}`);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};
