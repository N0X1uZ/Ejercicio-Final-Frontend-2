import { useState, useEffect } from 'react'

export default function TaskForm({ addTask, editingTask, updateTask }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false
  })

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask)
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.title.trim()) return
    
    if (editingTask) {
      updateTask(task)
    } else {
      addTask(task)
    }
    setTask({ title: '', description: '', completed: false })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-ps2-gray p-6 rounded-xl shadow-ps2 border-ps2 border-ps2-silver">
      <div className="mb-4">
        <label className="block text-ps2-silver text-sm font-bold mb-2">
          Título de la tarea
        </label>
        <input
          type="text"
          placeholder="Escribe el título aquí"
          className="w-full p-3 bg-ps2-black text-ps2-silver border-2 border-ps2-silver rounded-lg focus:border-ps2-blue focus:outline-none placeholder:text-ps2-silver/50"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-ps2-silver text-sm font-bold mb-2">
          Descripción (opcional)
        </label>
        <textarea
          placeholder="Añade detalles adicionales"
          className="w-full p-3 bg-ps2-black text-ps2-silver border-2 border-ps2-silver rounded-lg focus:border-ps2-blue focus:outline-none placeholder:text-ps2-silver/50 min-h-[100px]"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-ps2-blue hover:bg-ps2-blue/90 text-ps2-black font-bold py-3 px-4 rounded-lg border-2 border-ps2-silver transition-colors shadow-ps2-button active:scale-95"
      >
        {editingTask ? 'Actualizar Tarea' : 'Agregar Tarea'}
      </button>
    </form>
  )
}