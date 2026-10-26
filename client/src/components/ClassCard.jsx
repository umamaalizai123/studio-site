import SpotsStepper from './SpotsStepper'

export default function ClassCard({ item, reserved, onReservedChange }) {
  return (
    <article className="rounded-2xl border border-rosegold/40 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-rosegold">{item.day} · {item.time}</p>
      <h3 className="mt-1 text-lg font-bold text-berry">{item.name}</h3>
      <p className="text-sm">with {item.instructor}</p>
      <p className="mt-2 inline-block rounded-full bg-blush px-3 py-1 text-xs font-semibold text-berry">
        {item.type}
      </p>
      <p className="mt-2 text-xs">{item.spots - reserved} of {item.spots} spots left</p>

      <SpotsStepper value={reserved} onChange={onReservedChange} max={item.spots} />
    </article>
  )
}