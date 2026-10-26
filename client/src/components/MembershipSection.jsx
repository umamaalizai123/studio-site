import useFetch from '../hooks/useFetch'
import MembershipCard from './MembershipCard'

export default function MembershipSection() {
  const { data: memberships, loading, error } = useFetch('/api/memberships')

  return (
    <section id="membership" className="px-[5%] py-12">
      <h2 className="mb-6 text-2xl font-bold text-berry">Membership tiers</h2>

      {loading && <p>Loading memberships...</p>}
      {error && <p className="font-semibold text-red-700">{error}</p>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {memberships.map((plan) => (
          <MembershipCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  )
}