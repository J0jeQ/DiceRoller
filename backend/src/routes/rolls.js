import { Router } from 'express';
import { randomInt } from 'node:crypto';
import { auth } from '../middleware/auth.js';

const router = Router();
const DICE = [4, 6, 8, 10, 12, 20, 100];
const history = new Map();

router.post('/roll', auth, (req, res) => {
  const sides = Number(req.body.sides);
  if (!DICE.includes(sides)) {
    return res.status(400).json({ error: 'Invalid die type' });
  }

  const roll = {
    id: crypto.randomUUID(),
    sides,
    label: 'D' + sides,
    result: randomInt(1, sides + 1),
    timestamp: new Date().toISOString(),
  };

  const sessionId = req.user.sessionId;
  if (!history.has(sessionId)) history.set(sessionId, []);
  const list = history.get(sessionId);
  list.unshift(roll);
  if (list.length > 5) list.pop();

  res.json({ roll, history: list });
});

router.get('/history', auth, (req, res) => {
  res.json({ history: history.get(req.user.sessionId) || [] });
});

router.delete('/history', auth, (req, res) => {
  history.set(req.user.sessionId, []);
  res.json({ history: [] });
});

export default router;
