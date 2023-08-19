import { Logger } from '@/shared/logging/Logger';
import dataSource from '../../../datasource';

class PostgresConfig {
  async initialize(): Promise<void> {
    try {
      await dataSource.initialize();
      Logger.info('✅ write database on');
    } catch (err) {
      Logger.error('error on start write database', err);
      throw err;
    }
  }
}

export const postgresConfig = new PostgresConfig();
