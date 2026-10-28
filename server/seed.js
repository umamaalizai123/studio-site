import 'dotenv/config'
import { pool } from './db.js'

const classes = [
  { name: 'Reformer Foundations', day: 'Monday', time: '7:00', type: 'Reformer', instructor: 'Amina Khalid', spots: 6 },
  { name: 'Mat Pilates', day: 'Monday', time: '12:15', type: 'Mat', instructor: 'Amina Khalid', spots: 10 },
  { name: 'Stretch and Release', day: 'Monday', time: '18:00', type: 'Stretch', instructor: 'Zara Ali', spots: 8 },
  { name: 'Barre Fusion', day: 'Tuesday', time: '8:00', type: 'Barre', instructor: 'Layla Siddiqui', spots: 8 },
  { name: 'Reformer Flow', day: 'Tuesday', time: '17:30', type: 'Reformer', instructor: 'Amina Khalid', spots: 5 },
  { name: 'Prenatal Pilates', day: 'Wednesday', time: '19:00', type: 'Prenatal', instructor: 'Noor Hassan', spots: 6 },
  { name: 'Mat Pilates', day: 'Saturday', time: '9:00', type: 'Mat', instructor: 'Amina Khalid', spots: 12 },
  { name: 'Reformer Flow', day: 'Saturday', time: '10:30', type: 'Reformer', instructor: 'Layla Siddiqui', spots: 4 },
]

const trainers = [
  {
    name: 'Amina Khalid',
    role: 'Reformer and mat',
    bio: 'Certified pilates instructor who focuses on core strength and good posture.',
    photo: '/images/amina.jpg',
    alt: 'Amina Khalid exercising on a reformer',
    position: 'object-top',
  },
  {
    name: 'Layla Siddiqui',
    role: 'Barre fusion',
    bio: 'Blends ballet-inspired moves with pilates for long, strong lines.',
    photo: '/images/layla.jpg',
    alt: 'Layla Siddiqui lying on a reformer with her arms raised',
    position: 'object-center',
  },
  {
    name: 'Noor Hassan',
    role: 'Prenatal and postnatal',
    bio: 'Gentle, supportive sessions for mums-to-be and new mums.',
    photo: '/images/noor.jpg',
    alt: 'Noor Hassan smiling with her hands together in greeting',
    position: 'object-top',
  },
  {
    name: 'Zara Ali',
    role: 'Stretch and release',
    bio: 'Slow, mindful classes to ease tension and improve flexibility.',
    photo: '/images/zara.jpg',
    alt: 'Zara Ali stretching her arm in a studio with mirrors',
    position: 'object-[50%_25%]',
  },
]

const memberships = [
  {
    name: 'Single class',
    price: '$25',
    period: 'per class',
    perks: ['Any mat or reformer class', 'Book up to 24 hours ahead'],
    featured: false,
  },
  {
    name: 'Glow pack',
    price: '$99',
    period: 'for 5 classes',
    perks: ['Valid for 6 weeks', 'Book up to 7 days ahead', 'Free grip socks'],
    featured: true,
  },
  {
    name: 'Unlimited',
    price: '$149',
    period: 'per month',
    perks: ['Every class, every week', 'Priority booking', 'Bring a friend once a month'],
    featured: false,
  },
]

async function seed() {
  // Start fresh so the script can be run again safely
 await pool.query('drop table if exists bookings, classes, trainers, memberships')
  await pool.query(`
    create table classes (
      id serial primary key,
      name text not null,
      day text not null,
      time text not null,
      type text not null,
      instructor text not null,
      spots integer not null
    )
       `)
        await pool.query(`
    create table bookings (
      id serial primary key,
      user_id text not null references "user"(id) on delete cascade,
      class_id integer not null references classes(id) on delete cascade,
      spots integer not null check (spots > 0),
      unique (user_id, class_id)
    )
  
  `)

  await pool.query(`
    create table trainers (
      id serial primary key,
      name text not null,
      role text not null,
      bio text not null,
      photo text not null,
      alt text not null,
      position text not null
    )
  `)

  await pool.query(`
    create table memberships (
      id serial primary key,
      name text not null,
      price text not null,
      period text not null,
      perks text[] not null,
      featured boolean not null default false
    )
  `)

  for (const c of classes) {
    await pool.query(
      'insert into classes (name, day, time, type, instructor, spots) values ($1, $2, $3, $4, $5, $6)',
      [c.name, c.day, c.time, c.type, c.instructor, c.spots]
    )
  }

  for (const t of trainers) {
    await pool.query(
      'insert into trainers (name, role, bio, photo, alt, position) values ($1, $2, $3, $4, $5, $6)',
      [t.name, t.role, t.bio, t.photo, t.alt, t.position]
    )
  }

  for (const m of memberships) {
    await pool.query(
      'insert into memberships (name, price, period, perks, featured) values ($1, $2, $3, $4, $5)',
      [m.name, m.price, m.period, m.perks, m.featured]
    )
  }

  console.log('Database seeded')
  await pool.end()
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})