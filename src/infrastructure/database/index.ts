import { mongodbConfig } from './mongodb/config';
import { postgresConfig } from './postgres/config';

export class Database {
  initializeDatabases = async () => {
    await postgresConfig.initialize();
    await mongodbConfig.initialize();
  };

  closeDatabases = async () => {
    await mongodbConfig.stop();
  };
}
