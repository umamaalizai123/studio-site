import { memberships } from '../data/memberships'
import MembershipCard from './MembershipCard'

export default function MembershipSection() {
  return (
    <section id="membership" className="px-[5%] py-12">
      <h2 className="mb-6 text-2xl font-bold text-berry">Membership tiers</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {memberships.map((plan) => (
          <MembershipCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  )
}