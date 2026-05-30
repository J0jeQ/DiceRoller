import { Router } from 'express';
import { makeToken } from '../middleware/auth.js';

const router = Router();

router.post('/session', (_req, res) => {
  const token = makeToken({ sessionId: crypto.randomUUID() });
  res.json({ token });
});

export default router;
