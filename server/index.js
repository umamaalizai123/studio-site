import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { pool } from './db.js'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('select now()')
    res.json({ ok: true, time: result.rows[0].now })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, message: 'Database connection failed' })
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})