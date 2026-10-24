export default function TrainerCard({ trainer }) {
  return (
    <article className="rounded-2xl border border-rosegold/40 bg-white p-4 shadow-sm">
      <img
        src={trainer.photo}
        alt={trainer.alt}
        className={`mb-4 h-56 w-full rounded-xl object-cover ${trainer.position}`}
      />
      <h3 className="text-lg font-bold text-berry">{trainer.name}</h3>
      <p className="text-sm font-semibold text-rosegold">{trainer.role}</p>
      <p className="mt-2 text-sm">{trainer.bio}</p>
    </article>
  )
}