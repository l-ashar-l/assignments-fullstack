import { GoogleGenerativeAI } from '@google/generative-ai';
import removeMarkdown from 'remove-markdown';
import JSON5 from 'json5';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function parseResume(text: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are a resume parsing assistant. Given the following resume text, extract all the important details and return them in a well-structured JSON format.

The resume text:
${text}

Extract and include the following:
- Full Name
- Contact Number
- Email Address
- Location
- Skills (Technical and Non-Technical, separately if possible)
- Education
- Work Experience (including company name, role, and responsibilities)
- Certifications
- Languages spoken
- Suggested Resume Category (based on the skills and experience)
- Recommended Job Roles (based on the candidate's skills and experience)

Return the response in JSON format.
`;

const result = await model.generateContent(prompt);
const { response } = result;

try {
    return parseMarkdownJson(response.candidates?.[0]?.content?.parts[0]?.text);
  } catch (error) {
  }
}

function parseMarkdownJson(markdownText: any): any {
  const cleanedText = removeMarkdown(markdownText).trim();

  try {
    const jsonObject = JSON5.parse(cleanedText);
    return jsonObject;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
}

interface Resume {
  fullName: string;
  contactNumber: string | null;
  emailAddress: string | null;
  location: string | null;
  skills: {
    technical: string[];
    nonTechnical: string[];
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
