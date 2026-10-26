export default function MembershipCard({ plan }) {
  return (
    <article
      className={`flex flex-col rounded-2xl bg-white p-6 shadow-sm ${
        plan.featured ? 'border-4 border-rosegold' : 'border border-rosegold/40'
      }`}
    >
      <h3 className="text-xl font-bold text-berry">{plan.name}</h3>
      <p className="mt-2 text-4xl font-extrabold text-berry">
        {plan.price}
        <span className="ml-1 text-base font-normal text-ink">{plan.period}</span>
      </p>

      <ul className="mt-4 flex-1">
        {plan.perks.map((perk) => (
          <li key={perk} className="border-b border-rosegold/30 py-2 text-sm">
            {perk}
          </li>
        ))}
      </ul>

      <a
        href="#schedule"
        className={`mt-6 rounded-full px-5 py-3 text-center font-bold ${
          plan.featured
            ? 'bg-berry text-white hover:bg-berry/90'
            : 'border-2 border-berry text-berry hover:bg-rosegold/30'
        }`}
      >
        Choose {plan.name}
      </a>
    </article>
  )
}