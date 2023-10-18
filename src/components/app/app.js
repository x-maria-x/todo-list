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

  addTask = (text) => {
    if (text.trim() === '') return
    const newTask = this.createTask(text)

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

  createTask(label) {
    return {
      label,
      completed: false,
      editing: false,
      checked: false,
      id: this.maxId++,
      createTime: new Date(),
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
