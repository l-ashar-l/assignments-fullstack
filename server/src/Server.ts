import express from 'express';
import cors from 'cors';
import { parseRouter } from './routes';
import configurations from './config/configurations';

const PORT = configurations.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', parseRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
