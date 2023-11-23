import React, { useState } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import Footer from '../footer/footer'
import TaskList from '../task-list/task-list'

import timers from './timers'

import './app.css'

function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')
  const [id, setId] = useState(0)

  const createTask = (label, time = null) => {
    setId((prevId) => prevId + 1)
    return {
      label,
      completed: false,
      editing: false,
      checked: false,
      id,
      createTime: new Date(),
      time,
      isTimerOn: false,
    }
  }

  const timerOn = (idTask) => {
    if (Object.keys(timers).includes(idTask.toString())) return
    timers[idTask] = setInterval(() => {
      setTodoData((prevTodoData) => {
        const task = prevTodoData.find((item) => item.id === idTask)
        task.time--

        if (!task.time) {
          clearInterval(timers[idTask])
          delete timers[idTask]
          task.isTimerOn = false
        } else {
          task.isTimerOn = true
        }

        return prevTodoData.map((item) => (item.id === idTask ? task : item))
      })
    }, 1000)
  }

  const timerOff = (idTask) => {
    clearInterval(timers[idTask])
    delete timers[idTask]

    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => (item.id === idTask ? { ...item, isTimerOn: false } : item))
    )
  }

  const onFilter = (items, selectedFilter) => {
    switch (selectedFilter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.completed)
      case 'completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  const deleteTask = (idTask) => {
    clearInterval(timers[idTask])
    delete timers[idTask]

    setTodoData((prevTodoData) => prevTodoData.filter((task) => task.id !== idTask))
  }

  const addTask = (text, time) => {
    if (!text.trim()) return
    const newTask = createTask(text, time)

    setTodoData((prevTodoData) => [...prevTodoData, newTask])
  }

  const onToggleCompleted = (idTask) => {
    timerOff(idTask)

    setTodoData((prevTodoData) =>
      prevTodoData.map((item) =>
        item.id === idTask ? { ...item, completed: !item.completed, checked: !item.checked } : item
      )
    )
  }

  const onToggleEditing = (idTask) => {
    timerOff(idTask)

    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => (item.id === idTask ? { ...item, editing: !item.editing } : item))
    )
  }

  const updateTask = (newLabel, idTask) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => (item.id === idTask ? { ...item, editing: !item.editing, label: newLabel } : item))
    )
  }

  const clearComplitedTasks = () => {
    const complitedTasks = todoData.filter((task) => task.completed)
    complitedTasks.forEach((task) => deleteTask(task.id))
  }

  const onFilterChange = (selectedFilter) => {
    setFilter(selectedFilter)
  }

  const completedCount = todoData.filter((task) => task.completed).length
  const todoCount = todoData.length - completedCount

  const visibleItems = onFilter(todoData, filter)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          onToggleEditing={onToggleEditing}
          updateTask={updateTask}
          timerOn={timerOn}
          timerOff={timerOff}
        />
        <Footer
          toDo={todoCount}
          filter={filter}
          onFilterChange={onFilterChange}
          clearComplitedTasks={clearComplitedTasks}
        />
      </section>
    </section>
  )
}

export default App
