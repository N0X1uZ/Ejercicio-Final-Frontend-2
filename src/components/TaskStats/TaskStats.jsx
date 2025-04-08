
export default function TaskStats({ tasks }) {
  const pendingTasks = tasks.filter(task => !task.completed).length

  return (
    <div className="mb-6 flex justify-between items-center px-4 py-3 bg-blue-50 rounded-lg">
      <div className="text-sm text-blue-800">
        <span className="font-semibold">{pendingTasks}</span> tareas pendientes
      </div>
      <div className="text-sm text-gray-600">
        Total: <span className="font-semibold">{tasks.length}</span>
      </div>
    </div>
  )
}