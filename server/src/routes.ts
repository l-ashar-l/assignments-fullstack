import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { parseResume } from './parser';

const parserInput = z.object({ text: z.string().min(10) });
export const parseRouter = Router();

parseRouter.post('/parse', async (req: Request, res: Response): Promise<void> => {
  const body = req.body ?? {};
  
  const result = parserInput.safeParse(body);
  if (!result.success) {
    return void res
      .status(400)
      .json(result);
  }
  let parsed;
  try {
    parsed = await parseResume(result.data.text);
    res.json(parsed);
  } catch (err) {
    console.error('Parse error:', err);
    res.status(500).json({ error: parsed });
  }
});
