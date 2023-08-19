import mongoose from 'mongoose';
import { Logger } from '@/shared/logging/Logger';
import { Envs } from '../../../config/environment.ts';

class MongodbConfig {
  async initialize(): Promise<void> {
    mongoose.set('strictQuery', false);

    try {
      await mongoose.connect(Envs.READ_DB_URL_CONNECT, {});
      Logger.info('✅ read database on');
    } catch (error) {
      Logger.error('error on start read database', error);
    }
  }

  async stop(): Promise<void> {
    try {
      await mongoose.disconnect();
      Logger.info('🛑 read database off');
    } catch (error) {
      Logger.error('error on stop read database', error);
    }
  }
}

export const mongodbConfig = new MongodbConfig();
