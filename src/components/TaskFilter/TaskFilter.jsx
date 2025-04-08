export default function TaskFilter({ currentFilter, setFilter }) {
  const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'active', label: 'Activas' },
    { value: 'completed', label: 'Completadas' }
  ]

  return (
    <div className="flex gap-2 bg-ps2-black p-1 rounded-lg border border-ps2-silver">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setFilter(filter.value)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-all ${
            currentFilter === filter.value
              ? 'bg-ps2-blue text-ps2-black'
              : 'bg-ps2-gray text-ps2-silver hover:bg-ps2-gray/70'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}