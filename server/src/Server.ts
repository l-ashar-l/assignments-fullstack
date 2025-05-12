import express from 'express';
import cors from 'cors';
import { router } from './routes';
import configurations from './config/configurations';

const PORT = configurations.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
