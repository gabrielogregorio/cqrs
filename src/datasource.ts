import { DataSource } from 'typeorm';
import { UserEvents } from './entity/userEvents.entity';
import { env } from './envs';

const myDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: env.WRITE_DB_HOSTNAME,
  port: env.WRITE_DB_PORT,
  username: env.WRITE_DB_USERNAME,
  password: env.WRITE_DB_PASSWORD,
  database: env.WRITE_DB_DATABASE,
  entities: [UserEvents],
  migrations: ['./src/migrations/*.ts'],
  migrationsTableName: 'custom_migration_table',
});

export default myDataSource;
