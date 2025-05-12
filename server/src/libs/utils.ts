import removeMarkdown from 'remove-markdown';
import JSON5 from 'json5';
import Resume from '../types/IResume';

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