import { GoogleGenerativeAI } from '@google/generative-ai';
import configurations from '../config/configurations';
import { parseMarkdownJson, resumeParsePrompt, genAImodel } from '../libs/utils';
import Resume from '../types/IResume';

const genAI = new GoogleGenerativeAI(configurations.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: genAImodel });

export async function parseResume(text: string): Promise<Resume> {
  try {
    const result = await model.generateContent(resumeParsePrompt(text));
    const { response } = result;
    return parseMarkdownJson(response.candidates?.[0]?.content?.parts[0]?.text ?? '');
  } catch (error) {
    console.error('Failed to parseResume:', error);
    throw new Error('Error in parseResume function');
  }
}