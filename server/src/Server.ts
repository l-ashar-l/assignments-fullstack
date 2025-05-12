import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { parseRouter } from './routes';

dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', parseRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
