import removeMarkdown from 'remove-markdown';
import JSON5 from 'json5';
import Resume from '../types/IResume';

export const genAImodel = 'gemini-1.5-flash';

export const resumeParsePrompt = (text: string) => `
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

export function parseMarkdownJson(markdownText: any): Resume {
  const cleanedText = removeMarkdown(markdownText).trim();

  try {
    const jsonObject = JSON5.parse(cleanedText);
    return jsonObject;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    throw new Error('Error in converting markdown text to json');
  }
}