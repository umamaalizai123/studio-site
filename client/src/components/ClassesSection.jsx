import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import ClassCard from './ClassCard'

export default function ClassesSection() {
  const { data: classes, loading, error } = useFetch('/api/classes')
  const [selectedType, setSelectedType] = useState('All')
  const [reserved, setReserved] = useState({})

  const types = ['All', ...new Set(classes.map((item) => item.type))]

  const visibleClasses =
    selectedType === 'All'
      ? classes
      : classes.filter((item) => item.type === selectedType)

  function handleReservedChange(id, newValue) {
    setReserved((prev) => ({ ...prev, [id]: newValue }))
  }

  const totalReserved = Object.values(reserved).reduce((sum, n) => sum + n, 0)

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

          <p className="mb-6 font-semibold text-berry" aria-live="polite">
            Total spots reserved: {totalReserved}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleClasses.map((item) => (
              <ClassCard
                key={item.id}
                item={item}
                reserved={reserved[item.id] ?? 0}
                onReservedChange={(value) => handleReservedChange(item.id, value)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}