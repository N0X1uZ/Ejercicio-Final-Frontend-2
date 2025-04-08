export default function TaskItem({ task, deleteTask, toggleComplete, setEditingTask }) {
  return (
    <div className={`group flex items-center justify-between p-4 mb-3 rounded-lg
      bg-ps2-black hover:bg-ps2-gray/50 transition-colors border border-ps2-silver
      ${task.completed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <button 
          onClick={() => toggleComplete(task.id)}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center
            ${task.completed 
              ? 'border-ps2-blue bg-ps2-blue' 
              : 'border-ps2-silver hover:border-ps2-blue'}`}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-ps2-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
          )}
        </button>
        
        <div className="flex-1">
          <h3 className={`font-medium ${task.completed ? 'line-through text-ps2-silver/60' : 'text-ps2-silver'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-ps2-silver/70 mt-1">{task.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3 ml-4">
        <button
          onClick={() => setEditingTask(task)}
          className="text-ps2-silver hover:text-ps2-blue p-1 rounded-md hover:bg-ps2-blue/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 114.95 0 2.5 2.5 0 01-4.95 0M12 15.75V18m-4.5-3h12" />
          </svg>
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-ps2-silver hover:text-ps2-red p-1 rounded-md hover:bg-ps2-red/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}