import { DataSource } from 'typeorm';
import { UserEvents } from './domain/entity/userEvents';
import { Envs } from './config/environment.ts';

const myDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: Envs.WRITE_DB_HOSTNAME,
  port: 5432,
  username: Envs.WRITE_DB_USERNAME,
  password: Envs.WRITE_DB_PASSWORD,
  database: Envs.WRITE_DB_DATABASE,
  entities: [UserEvents],
  migrations: ['./src/infrastructure/database/postgres/migrations/*.ts'],
  migrationsTableName: 'custom_migration_table',
});

export default myDataSource;
