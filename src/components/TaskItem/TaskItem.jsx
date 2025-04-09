import { useCallback } from 'react'

const TaskCompletionToggle = ({ isDone, onToggle }) => {
  const getToggleStyle = useCallback(() => {
    return isDone 
      ? 'bg-ps2-blue border-ps2-blue' 
      : 'border-ps2-silver hover:border-ps2-blue'
  }, [isDone])

  return (
    <div 
      role="checkbox"
      aria-checked={isDone}
      onClick={onToggle}
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-colors ${getToggleStyle()}`}
    >
      {isDone && (
        <svg className="w-3 h-3 text-ps2-black" viewBox="0 0 20 20">
          <path fill="currentColor" d="M7.293 13.707l-3-3a1 1 0 1 1 1.414-1.414l1.793 1.793 5.793-5.793a1 1 0 1 1 1.414 1.414l-6.5 6.5a1 1 0 0 1-1.414 0z"/>
        </svg>
      )}
    </div>
  )
}

const TaskContent = ({ title, description, isCompleted }) => {
  const textStyle = isCompleted 
    ? 'line-through text-ps2-silver/60' 
    : 'text-ps2-silver'

  return (
    <div className="flex-1 min-w-0">
      <h3 className={`font-medium truncate ${textStyle}`}>
        {title}
      </h3>
      {description && (
        <p className="text-sm text-ps2-silver/70 mt-1 truncate">
          {description}
        </p>
      )}
    </div>
  )
}

const TaskActions = ({ onEdit, onDelete }) => {
  const ActionButton = ({ children, onClick, colorClass }) => (
    <button
      onClick={onClick}
      className={`p-1 rounded-md text-ps2-silver transition-colors ${colorClass}`}
    >
      {children}
    </button>
  )

  return (
    <div className="flex items-center gap-3 ml-4">
      <ActionButton 
        onClick={onEdit}
        colorClass="hover:text-ps2-blue hover:bg-ps2-blue/20"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 5l2-2m-4 4l4-4m-6 6l2 2m4-4l-4 4m6-6l-2 2m-4-4l4 4m-6-6l-2 2"/>
        </svg>
      </ActionButton>
      <ActionButton 
        onClick={onDelete}
        colorClass="hover:text-ps2-red hover:bg-ps2-red/20"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 6l12 12M6 18L18 6"/>
        </svg>
      </ActionButton>
    </div>
  )
}

export default function TodoItem({ task, deleteTask, toggleComplete, setEditingTask }) {
  const containerStyle = task.completed ? 'opacity-60' : ''

  return (
    <article className={`group flex items-center justify-between p-4 mb-3 rounded-lg border border-ps2-silver bg-ps2-black hover:bg-ps2-gray/50 transition-colors ${containerStyle}`}>
      <div className="flex items-center gap-3 flex-1">
        <TaskCompletionToggle 
          isDone={task.completed}
          onToggle={() => toggleComplete(task.id)}
        />
        
        <TaskContent 
          title={task.title}
          description={task.description}
          isCompleted={task.completed}
        />
      </div>
      
      <TaskActions
        onEdit={() => setEditingTask(task)}
        onDelete={() => deleteTask(task.id)}
      />
    </article>
  )
}