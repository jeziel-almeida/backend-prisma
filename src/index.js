import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors()) // permite que qualquer domínio acesse a api
app.use(express.json()) // permite a utilização de json nas requisições da api

routes(app);

app.listen(3001);
console.log('server started');