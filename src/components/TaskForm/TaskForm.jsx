import { useState, useEffect } from 'react'

const initialFormState = {
  title: '',
  description: '',
  completed: false,
  priority: 'medium',
  dueDate: ''
}

const VALIDATION_PATTERNS = {
  title: {
    pattern: /^(?!\s*$)[\wñÑáéíóúÁÉÍÓÚ\s\-_,.:;¡!¿?()]{2,50}$/,
    message: 'Debe tener 2-50 caracteres válidos (no solo espacios)'
  },
  description: {
    pattern: /^[\s\S]{0,500}$/,
    message: 'Máximo 500 caracteres permitidos'
  },
  dueDate: {
    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    message: 'Formato DD/MM/AAAA'
  },
  priority: {
    pattern: /^(low|medium|high)$/,
    message: 'Selecciona una prioridad válida'
  }
}

const ERROR_MESSAGES = {
  required: 'Este campo es obligatorio',
  invalidFormat: 'Formato inválido',
  maxLength: (max) => `Máximo ${max} caracteres`,
  minLength: (min) => `Mínimo ${min} caracteres`,
  futureDate: 'La fecha debe ser futura'
}

export default function TaskForm({ addTask, editingTask, updateTask }) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (editingTask) {
      setFormData({
        ...initialFormState,
        ...editingTask,
        dueDate: editingTask.dueDate || ''
      })
    }
  }, [editingTask])

  const validateField = (name, value) => {
    if (!VALIDATION_PATTERNS[name]) return ''
    
    const { pattern, message } = VALIDATION_PATTERNS[name]
    
    // Una Validación de campo requerido
    if ((name === 'title' || name === 'priority') && !value.trim()) {
      return ERROR_MESSAGES.required
    }
    
    // Validación de patrón
    if (value && !pattern.test(value)) {
      return message || ERROR_MESSAGES.invalidFormat
    }
    
    // Validaciones específicas
    if (name === 'title' && value.trim().length < 2) {
      return ERROR_MESSAGES.minLength(2)
    }
    
    if (name === 'dueDate' && value) {
      const [day, month, year] = value.split('/')
      const inputDate = new Date(`${year}-${month}-${day}`)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (inputDate < today) {
        return ERROR_MESSAGES.futureDate
      }
    }
    
    return ''
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Valido todos los campos
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'completed') {
        const error = validateField(key, formData[key])
        if (error) newErrors[key] = error
      }
    })
    
    setErrors(newErrors)
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    
    if (Object.keys(newErrors).length > 0) return
    
    // Preparar datos para enviar
    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate || null
    }
    
    const taskOperation = editingTask ? updateTask : addTask
    taskOperation(taskData)
    
    setFormData(initialFormState)
    setErrors({})
    setTouched({})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validación en tiempo real solo para campos tocados
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const getInputClass = (name) => {
    const baseClass = 'w-full p-3 bg-ps2-black text-ps2-silver border-2 rounded-lg focus:outline-none placeholder:text-ps2-silver/50'
    const errorClass = 'border-ps2-red focus:border-ps2-red'
    const validClass = 'border-ps2-silver focus:border-ps2-blue'
    
    return `${baseClass} ${errors[name] ? errorClass : validClass}`
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-ps2-gray p-6 rounded-xl shadow-ps2 border-ps2 border-ps2-silver">
      <div className="mb-4">
        <label className="block text-ps2-silver text-sm font-bold mb-2">
          Título de la tarea *
        </label>
        <input
          type="text"
          name="title"
          placeholder="Escribe el título aquí"
          className={getInputClass('title')}
          value={formData.title}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
          maxLength={50}
        />
        <div className="flex justify-between">
          {errors.title && (
            <span className="text-ps2-red text-sm mt-1 block">{errors.title}</span>
          )}
          <span className="text-ps2-silver/50 text-sm mt-1 ml-auto">
            {formData.title.length}/50
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-ps2-silver text-sm font-bold mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          placeholder="Añade detalles adicionales (máx. 500 caracteres)"
          className={`${getInputClass('description')} min-h-[100px]`}
          value={formData.description}
          onChange={handleInputChange}
          onBlur={handleBlur}
          maxLength={500}
        />
        <div className="flex justify-between">
          {errors.description && (
            <span className="text-ps2-red text-sm mt-1 block">{errors.description}</span>
          )}
          <span className="text-ps2-silver/50 text-sm mt-1 ml-auto">
            {formData.description.length}/500
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-ps2-silver text-sm font-bold mb-2">
            Prioridad *
          </label>
          <select
            name="priority"
            className={getInputClass('priority')}
            value={formData.priority}
            onChange={handleInputChange}
            onBlur={handleBlur}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          {errors.priority && (
            <span className="text-ps2-red text-sm mt-1 block">{errors.priority}</span>
          )}
        </div>
        
        <div>
          <label className="block text-ps2-silver text-sm font-bold mb-2">
            Fecha límite
          </label>
          <input
            type="text"
            name="dueDate"
            placeholder="DD/MM/AAAA"
            className={getInputClass('dueDate')}
            value={formData.dueDate}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.dueDate && (
            <span className="text-ps2-red text-sm mt-1 block">{errors.dueDate}</span>
          )}
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-ps2-blue hover:bg-ps2-blue/90 text-ps2-black font-bold py-3 px-4
          rounded-lg border-2 border-ps2-silver transition-colors shadow-ps2-button active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={Object.keys(errors).some(key => errors[key])}
      >
        {editingTask ? 'Actualizar Tarea' : 'Agregar Tarea'}
      </button>
    </form>
  )
}