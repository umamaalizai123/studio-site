import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node'
import { auth } from './auth.js'
import { pool } from './db.js'

const app = express()
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(cors({ origin: clientUrl, credentials: true }))

// Better Auth handler: must be before express.json()
app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

async function requireUser(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })
    if (!session) return res.status(401).json({ message: 'Please sign in' })
    req.user = session.user
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not check your session' })
  }
}
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
    const result = await pool.query(`
      select c.*, coalesce(sum(b.spots), 0)::int as booked
      from classes c
      left join bookings b on b.class_id = c.id
      group by c.id
      order by c.id
    `)
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
app.get('/api/bookings', requireUser, async (req, res) => {
  try {
    const result = await pool.query(
      'select class_id, spots from bookings where user_id = $1',
      [req.user.id]
    )
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not load your bookings' })
  }
})

app.put('/api/bookings/:classId', requireUser, async (req, res) => {
  const classId = Number(req.params.classId)
  const spots = Number(req.body.spots)

  if (!Number.isInteger(classId) || !Number.isInteger(spots) || spots < 0) {
    return res.status(400).json({ message: 'Invalid booking' })
  }

  try {
    const cls = await pool.query('select spots from classes where id = $1', [classId])
    if (cls.rows.length === 0) {
      return res.status(404).json({ message: 'Class not found' })
    }

    const others = await pool.query(
      'select coalesce(sum(spots), 0)::int as taken from bookings where class_id = $1 and user_id <> $2',
      [classId, req.user.id]
    )

    if (spots > cls.rows[0].spots - others.rows[0].taken) {
      return res.status(400).json({ message: 'Not enough spots left' })
    }

    if (spots === 0) {
      await pool.query(
        'delete from bookings where class_id = $1 and user_id = $2',
        [classId, req.user.id]
      )
    } else {
      await pool.query(
        `insert into bookings (user_id, class_id, spots)
         values ($1, $2, $3)
         on conflict (user_id, class_id) do update set spots = excluded.spots`,
        [req.user.id, classId, spots]
      )
    }

    res.json({ classId, spots })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not save your booking' })
  }
})
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})