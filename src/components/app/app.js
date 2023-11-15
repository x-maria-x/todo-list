import React, { Component } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import Footer from '../footer/footer'
import TaskList from '../task-list/task-list'

import './app.css'

export default class App extends Component {
  minId = 0

  state = {
    todoData: [],
    filter: 'all',
  }

  timers = {}

  static onFilter = (items, filter) => {
    switch (filter) {
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

  deleteTask = (idTask) => {
    clearInterval(this.timers[idTask])
    delete this.timers[idTask]

    this.setState(
      ({ todoData }) => ({
        todoData: todoData.filter((task) => task.id !== idTask),
      }),
      this.updateTimers
    )
  }

  addTask = (text, time) => {
    if (!text.trim()) return
    const newTask = this.createTask(text, time)

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTask],
    }))
  }

  onToggleCompleted = (idTask) => {
    this.timerOff(idTask)
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) =>
        item.id === idTask ? { ...item, completed: !item.completed, checked: !item.checked } : item
      ),
    }))
  }

  onToggleEditing = (idTask) => {
    this.timerOff(idTask)
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => (item.id === idTask ? { ...item, editing: !item.editing } : item)),
    }))
  }

  updateTask = (newLabel, idTask) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) =>
        item.id === idTask ? { ...item, editing: !item.editing, label: newLabel } : item
      ),
    }))
  }

  clearComplitedTasks = () => {
    const complitedTasks = this.state.todoData.filter((task) => task.completed)
    complitedTasks.forEach((task) => this.deleteTask(task.id))
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  timerOn = (idTask, e) => {
    if (e) e.stopPropagation()
    const indexTask = this.state.todoData.findIndex((task) => task.id === idTask)
    if (indexTask === -1) return
    const task = this.state.todoData[indexTask]

    if (Object.keys(this.timers).includes(idTask.toString())) return

    this.timers[idTask] = setInterval(() => {
      if (!this.state.todoData[indexTask]) return

      this.setState(({ todoData }) => {
        task.time--
        if (!task.time) {
          clearInterval(this.timers[indexTask])
          delete this.timers[indexTask]
          task.isTimerOn = false
        } else {
          task.isTimerOn = true
        }
        return {
          todoData: todoData.map((item) => (item.id === idTask ? task : item)),
        }
      })
    }, 1000)
  }

  timerOff = (idTask, e) => {
    if (e) e.stopPropagation()

    clearInterval(this.timers[idTask])
    delete this.timers[idTask]

    this.setState(({ todoData }) => {
      const indexTask = todoData.findIndex((task) => task.id === idTask)
      const task = todoData[indexTask]
      task.isTimerOn = false
      return {
        todoData: todoData.map((item) => (item.id === idTask ? task : item)),
      }
    })
  }

  updateTimers() {
    Object.values(this.timers).forEach((timer) => clearInterval(timer))
    this.timers = {}

    this.state.todoData.forEach((task) => {
      if (task.isTimerOn) {
        this.timerOn(task.id)
      }
    })
  }

  createTask(label, time = null) {
    return {
      label,
      completed: false,
      editing: false,
      checked: false,
      id: this.minId++,
      createTime: new Date(),
      time,
      isTimerOn: false,
    }
  }

  render() {
    const { todoData, filter } = this.state
    const completedCount = todoData.filter((task) => task.completed).length
    const todoCount = todoData.length - completedCount

    const visibleItems = App.onFilter(todoData, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEditing={this.onToggleEditing}
            updateTask={this.updateTask}
            timerOn={this.timerOn}
            timerOff={this.timerOff}
          />
          <Footer
            toDo={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearComplitedTasks={this.clearComplitedTasks}
          />
        </section>
      </section>
    )
  }
}
