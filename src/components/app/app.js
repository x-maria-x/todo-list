import React, { Component } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import Footer from '../footer/footer'
import TaskList from '../task-list/task-list'
import './app.css'

export default class App extends Component {
  maxId = 0

  state = {
    todoData: [],
    filter: 'all',
    timers: {},
  }

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

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArr,
      }
    })
  }

  addTask = (text, time) => {
    if (text.trim() === '') return
    const newTask = this.createTask(text, time)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask]

      return {
        todoData: newArr,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      const newTask = {
        ...oldTask,
        completed: !oldTask.completed,
        checked: !oldTask.checked,
      }
      const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      const newTask = { ...oldTask, editing: !oldTask.editing }
      const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  updateTask = (label, id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      oldTask.label = label
      const newTask = { ...oldTask, editing: !oldTask.editing }
      const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  clearComplitedTasks = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((item) => !item.completed)
      return { todoData: newArr }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  timerOn = (id) => {
    const { todoData, timers } = this.state
    const task = todoData.find((el) => el.id === id)
    const isTimerOn = task ? task.isTimerOn : false
    if (isTimerOn) return

    timers[id] = setInterval(() => {
      this.setState(() => {
        const newTaskData = todoData.slice()
        task.time--
        if (task.time === 0) {
          clearInterval(timers[id])
        }
        task.isTimerOn = true
        return newTaskData
      })
    }, 1000)
  }

  timerOff = (id) => {
    const { timers } = this.state

    clearInterval(timers[id])
    delete timers[id]

    this.setState(({ todoData }) => {
      const newTaskData = todoData.slice()
      const task = newTaskData.find((el) => el.id === id)
      task.isTimerOn = false
      return newTaskData
    })
  }

  createTask(label, time = null) {
    return {
      label,
      completed: false,
      editing: false,
      checked: false,
      id: this.maxId++,
      createTime: new Date(),
      time,
      isTimerOn: false,
    }
  }

  render() {
    const { todoData, filter } = this.state
    const completedCount = todoData.filter((el) => el.completed).length
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
