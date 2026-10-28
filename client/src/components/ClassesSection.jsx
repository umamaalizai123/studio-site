import { useState } from 'react'
import { API_URL } from '../api'
import { authClient } from '../auth-client'
import useFetch from '../hooks/useFetch'
import ClassCard from './ClassCard'

export default function ClassesSection() {
  const { data: session } = authClient.useSession()
  const { data: classes, loading, error, reload: reloadClasses } = useFetch('/api/classes')
  const { data: myBookings, reload: reloadBookings } = useFetch(
    session ? '/api/bookings' : null
  )
  const [selectedType, setSelectedType] = useState('All')
  const [message, setMessage] = useState('')

  const reservedByClass = Object.fromEntries(
    myBookings.map((b) => [b.class_id, b.spots])
  )

  const types = ['All', ...new Set(classes.map((item) => item.type))]

  const visibleClasses =
    selectedType === 'All'
      ? classes
      : classes.filter((item) => item.type === selectedType)

  const totalReserved = myBookings.reduce((sum, b) => sum + b.spots, 0)

  async function handleReservedChange(classId, newValue) {
    if (!session) {
      setMessage('Please sign in to reserve a spot.')
      return
    }
    setMessage('')

    const res = await fetch(`${API_URL}/api/bookings/${classId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ spots: newValue }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setMessage(body.message || 'Could not update your booking.')
    }

    reloadBookings()
    reloadClasses()
  }

  return (
    <section id="schedule" className="px-[5%] py-12">
      <h2 className="mb-4 text-2xl font-bold text-berry">Class schedule</h2>

      {loading && <p>Loading classes...</p>}
      {error && <p className="font-semibold text-red-700">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                aria-pressed={selectedType === type}
                className={
                  selectedType === type
                    ? 'rounded-full bg-berry px-4 py-2 text-sm font-semibold text-white'
                    : 'rounded-full border border-berry px-4 py-2 text-sm font-semibold text-berry hover:bg-rosegold/30'
                }
              >
                {type}
              </button>
            ))}
          </div>

          {!session && (
            <p className="mb-2 text-sm">
              <a href="#account" className="font-semibold text-berry underline">Sign in</a>{' '}
              to reserve spots.
            </p>
          )}

          {session && (
            <p className="mb-2 font-semibold text-berry" aria-live="polite">
              Your reserved spots: {totalReserved}
            </p>
          )}

          {message && (
            <p role="alert" className="mb-4 font-semibold text-red-700">
              {message}
            </p>
          )}

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleClasses.map((item) => (
              <ClassCard
                key={item.id}
                item={item}
                reserved={reservedByClass[item.id] ?? 0}
                onReservedChange={(value) => handleReservedChange(item.id, value)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}