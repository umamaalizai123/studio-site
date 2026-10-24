import { classes } from '../data/classes'
import ClassCard from './ClassCard'

export default function ClassesSection() {
  return (
    <section id="schedule" className="px-[5%] py-12">
      <h2 className="mb-6 text-2xl font-bold text-berry">Class schedule</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((item) => (
          <ClassCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}