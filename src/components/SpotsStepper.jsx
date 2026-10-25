export default function SpotsStepper({ value, onChange, max }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-2">
      <span className="text-sm font-semibold">Reserve spots</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={value <= 0}
          aria-label="Remove one spot"
          className="h-9 w-9 rounded-full border border-berry text-lg font-bold text-berry disabled:opacity-40"
        >
          −
        </button>
        <output aria-live="polite" className="w-6 text-center font-bold">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label="Add one spot"
          className="h-9 w-9 rounded-full border border-berry text-lg font-bold text-berry disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  )
}