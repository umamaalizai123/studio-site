import 'dotenv/config'
import { betterAuth } from 'better-auth'
import { pool } from './db.js'

export const auth = betterAuth({
  database: pool,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  trustedOrigins: [process.env.CLIENT_URL || 'http://localhost:5173'],
  emailAndPassword: { enabled: true },
})