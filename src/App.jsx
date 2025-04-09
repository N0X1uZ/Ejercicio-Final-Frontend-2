import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import TaskFilter from './components/TaskFilter/TaskFilter'


function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  
  const [filter, setFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: uuidv4(), completed: false }])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
    setEditingTask(null)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="min-h-screen bg-ps2-black text-ps2-silver">
      <div className="container mx-auto px-4 max-w-2xl py-8">
        {/* Header PS2 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2 text-ps2-blue border-b-4 border-ps2-red pb-2">
            Gestor de Tareas
          </h1>
          <p className="text-ps2-silver/70">Organiza tus actividades al estilo PS2</p>
        </div>

        <div className="space-y-8">
          {/* Formulario PS2 */}
          <div className="bg-ps2-gray rounded-xl p-6 shadow-ps2 border-ps2 border-ps2-silver">
            <h2 className="text-xl font-semibold mb-4 text-ps2-silver">
              {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
            </h2>
            <TaskForm 
              addTask={addTask} 
              editingTask={editingTask}
              updateTask={updateTask}
            />
          </div>

          {/* Estadísticas y Filtros PS2 */}
          <div className="bg-ps2-gray rounded-xl p-6 shadow-ps2 border-ps2 border-ps2-silver">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-ps2-black p-4 rounded-lg border border-ps2-silver">
                <p className="text-sm text-ps2-silver/70">Pendientes</p>
                <p className="text-2xl font-bold text-ps2-blue">{tasks.filter(t => !t.completed).length}</p>
              </div>
              <div className="bg-ps2-black p-4 rounded-lg border border-ps2-silver">
                <p className="text-sm text-ps2-silver/70">Total tareas</p>
                <p className="text-2xl font-bold text-ps2-red">{tasks.length}</p>
              </div>
            </div>
            
            <TaskFilter currentFilter={filter} setFilter={setFilter} />
          </div>

          {/* Lista de Tareas PS2 */}
          <div className="bg-ps2-gray rounded-xl p-6 shadow-ps2 border-ps2 border-ps2-silver">
            <TaskList 
              tasks={filteredTasks} 
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              setEditingTask={setEditingTask}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App