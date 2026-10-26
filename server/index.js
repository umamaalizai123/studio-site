import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth.js'
import { pool } from './db.js'

const app = express()
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(cors({ origin: clientUrl, credentials: true }))

// Better Auth handler: must be before express.json()
app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Aafiyat Pilates API is running' })
})

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('select now()')
    res.json({ ok: true, time: result.rows[0].now })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, message: 'Database connection failed' })
  }
})

app.get('/api/classes', async (req, res) => {
  try {
    const result = await pool.query('select * from classes order by id')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not load classes' })
  }
})

app.get('/api/trainers', async (req, res) => {
  try {
    const result = await pool.query('select * from trainers order by id')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not load trainers' })
  }
})

app.get('/api/memberships', async (req, res) => {
  try {
    const result = await pool.query('select * from memberships order by id')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not load memberships' })
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})