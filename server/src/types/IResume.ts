export interface SkillWithProficiency {
  name: string;
  proficiency: string;
}

export default interface Resume {
    fullName: string;
    contactNumber: string | null;
    emailAddress: string | null;
    location: string | null;
    skills: {
      technical: SkillWithProficiency[];
      nonTechnical: SkillWithProficiency[];
    };
    education: Array<{
      degree: string;
      university: string;
      year: number;
    }>;
    workExperience: Array<{
      company: string;
      role: string;
      period: string;
      responsibilities: string | null;
    }>;
    certifications: string[];
    languagesSpoken: string[];
    suggestedResumeCategory: string;
    recommendedJobRoles: string[];
  }
  