import { GoogleGenerativeAI } from '@google/generative-ai';
import configurations from '../config/configurations';
import { parseMarkdownJson } from '../libs/utils';

const genAI = new GoogleGenerativeAI(configurations.GOOGLE_API_KEY!);

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

try {
    const result = await model.generateContent(prompt);
    const { response } = result;
    return parseMarkdownJson(response.candidates?.[0]?.content?.parts[0]?.text);
  } catch (error) {
    console.error('Failed to parseResume:', error);
    throw new Error('Error in parseResume function');
  }
}