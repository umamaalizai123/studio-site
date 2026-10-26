import { trainers } from '../data/trainers'
import TrainerCard from './TrainerCard'

export default function TrainersSection() {
  return (
    <section id="trainers" className="bg-white/60 px-[5%] py-12">
      <h2 className="mb-6 text-2xl font-bold text-berry">Meet your instructors</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </section>
  )
}