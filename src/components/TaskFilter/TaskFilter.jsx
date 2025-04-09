const FILTER_OPTIONS = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Activas' },
  { value: 'completed', label: 'Completadas' }
]

export default function TaskFilter({ currentFilter, setFilter }) {
  const getButtonClass = (filterValue) => 
    `flex-1 py-2 px-4 rounded-md text-sm font-bold transition-all ${
      currentFilter === filterValue
        ? 'bg-ps2-blue text-ps2-black'
        : 'bg-ps2-gray text-ps2-silver hover:bg-ps2-gray/70'
    }`
    
  return (
    <div className="flex gap-2 bg-ps2-black p-1 rounded-lg border border-ps2-silver">
      {FILTER_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={getButtonClass(value)}
          aria-current={currentFilter === value}
        >
          {label}
        </button>
      ))}
    </div>
  )
}