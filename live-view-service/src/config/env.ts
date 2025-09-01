// src/env.ts
import * as dotenv from 'dotenv';
dotenv.config();

function requiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Environment variable ${key} is required but not defined`);
  }
  return value;
}

export const config = {
  port: parseInt(requiredEnv('PORT'), 10),
  baseUrl: requiredEnv('BASE_URL'),
  // streamSourceUrl: requiredEnv('STREAM_SOURCE_URL'),
};
