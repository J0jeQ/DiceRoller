import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import rollRoutes from './routes/rolls.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', rollRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
