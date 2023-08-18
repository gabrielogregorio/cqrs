const dotenv = require('dotenv');

dotenv.config({ path: './.env.example' });

export const env = {
  WRITE_DB_USERNAME: process.env.WRITE_DB_USERNAME.trim().toString(),
  WRITE_DB_PASSWORD: process.env.WRITE_DB_PASSWORD.trim().toString(),
  WRITE_DB_DATABASE: process.env.WRITE_DB_DATABASE.trim().toString(),
  WRITE_DB_HOSTNAME: process.env.WRITE_DB_HOSTNAME.trim().toString(),
  WRITE_DB_PORT: Number(process.env.WRITE_DB_PORT.trim().toString()),

  READ_DB_URL_CONNECT: process.env.READ_DB_URL_CONNECT.trim().toString(),
};
