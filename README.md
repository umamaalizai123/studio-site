# Aafiyat Pilates

A responsive website for a women's pilates studio, with a class schedule, instructor cards and membership tiers.

## Versions

- **Assignment 1:** plain HTML5 and CSS3 (tag `assignment-1`)
- **Assignment 2:** React, Vite and Tailwind (tag `assignment-2`)
- **Assignment 3 (current):** Express API, Postgres on Neon, and authentication with Better Auth

## Structure

```
client/    React + Tailwind frontend
server/    Express API, database connection, seed script, auth setup
```

## Running it locally

1. Create `server/.env` with these variables (never commit this file):

```
   DATABASE_URL=your Neon connection string
   AUTH_SECRET=a random string of at least 32 characters
```

2. Install and seed the database:

```
   cd server
   npm install
   npm run seed
```

3. Start the API:

```
   npm run dev
```

4. In a second terminal, start the website:

```
   cd client
   npm install
   npm run dev
```

5. Open `http://localhost:5173`.

## Database

- `classes`: name, day, time, type, instructor, spots
- `trainers`: name, role, bio, photo, alt text, photo position
- `memberships`: name, price, period, perks, featured
- `user`, `session`, `account`, `verification`: created by Better Auth

## Done so far

- Class filter built with `useState`
- Spots stepper as a controlled component
- API routes for classes, trainers and memberships
- React fetches live data from the API
- Better Auth configured on the server

## Still to do

- Booking feature to reserve a spot, saved in the database
- Signup, login and logout screens in React
- Deploy the API and the website

## Notes

Photos are stock images and the instructor names and bios are placeholders. They are not real people.