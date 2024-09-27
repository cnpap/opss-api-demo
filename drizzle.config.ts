import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
import configuration from './src/config/configuration';

config();

const env = configuration();

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  schema: './src/entity/drizzle.ts',
  dialect: 'postgresql',
  dbCredentials: {
    host: env.database.host,
    port: env.database.port,
    user: env.database.user,
    password: env.database.password,
    database: env.database.database,
    ssl: false,
  },
  out: './src/entity/drizzle',
});
