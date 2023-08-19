import express from 'express';
import cors from 'cors';
import '@/infrastructure/eventEmitter/listeners.ts';
import { processEvents } from '@/application/eventProcessor';
import { Logger } from '@/shared/logging/Logger';
import { Routes } from './interfaces/routes';
import { Envs } from './config/environment.ts';
import { Database } from './infrastructure/database';

new Database().initializeDatabases();

const app = express();

app.use(express.json());
app.use(cors());

app.use(Routes);

setInterval(processEvents, 5000);

app.listen(Envs.APPLICATION_PORT, () => {
  Logger.info(`Server is running on port ${Envs.APPLICATION_PORT}`);
});
