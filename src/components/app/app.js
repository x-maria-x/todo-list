import React, { Component } from 'react'

import NewTaskForm from '../new-task-form/new-task-form'
import Footer from '../footer/footer'
import TaskList from '../task-list/task-list'

import './app.css'

export default class App extends Component {
  minId = 0

  state = {
    todoData: [
      {
        label: '0',
        completed: false,
        editing: false,
        checked: false,
        id: 0,
        createTime: new Date(),
        time: 5,
        isTimerOn: true,
      },
      {
        label: '1',
        completed: false,
        editing: false,
        checked: false,
        id: 1,
        createTime: new Date(),
        time: 5,
        isTimerOn: true,
      },
      {
        label: '2',
        completed: false,
        editing: false,
        checked: false,
        id: 2,
        createTime: new Date(),
        time: 5,
        isTimerOn: true,
      },
      {
        label: '3',
        completed: false,
        editing: false,
        checked: false,
        id: 3,
        createTime: new Date(),
        time: 5,
        isTimerOn: true,
      },
    ],
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

  deleteTask = (id) => {
    clearInterval(this.timers[id])
    delete this.timers[id]
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArr,
      }
    }, this.updateTimers)
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
    const complitedTasks = this.state.todoData.filter((task) => task.completed)
    complitedTasks.forEach((task) => this.deleteTask(task.id))
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  timerOn = (id, e) => {
    if (e) e.stopPropagation()
    const idx = this.state.todoData.findIndex((el) => el.id === id)
    // const idx = id
    if (idx === -1) return
    const task = this.state.todoData[idx]
    // if (!task) return
    // const isTimerOn = task ? task.isTimerOn : false
    // if (isTimerOn) return
    // if (Object.keys(this.timers).includes(idx))
    // console.log(Object.keys(this.timers))
    // console.log(idx.toString())
    // console.log(Object.keys(this.timers).includes(idx.toString()))
    if (Object.keys(this.timers).includes(id.toString())) return

    this.timers[id] = setInterval(() => {
      if (!this.state.todoData[idx]) return

      this.setState(
        ({ todoData }) => {
          const oldTask = todoData[idx]
          oldTask.time--
          oldTask.isTimerOn = true
          const newTask = { ...oldTask }
          const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
          return {
            todoData: newArr,
          }
        },
        () => {
          if (this.state.todoData[idx].time === 0) {
            clearInterval(this.timers[idx])
            delete this.timers[idx]
            task.isTimerOn = false
          }
        }
      )
    }, 1000)
  }

  timerOff = (id, e) => {
    if (e) e.stopPropagation()
    // const { timers } = this.state

    clearInterval(this.timers[id])
    delete this.timers[id]

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      oldTask.isTimerOn = false
      const newTask = { ...oldTask }
      const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
    console.log(this.timers)
  }

  updateTimers() {
    Object.values(this.timers).forEach((timer) => clearInterval(timer))
    // Object.keys(this.timers).forEach((taskId) => {
    //   this.timerOff(taskId)
    // clearInterval(this.timers[taskId])
    // this.setState(({ todoData }) => {
    //   console.log(todoData)

    //   const newTodoData = [...todoData]
    //   console.log(newTodoData)
    //   newTodoData.forEach((task) => {
    //     if (task.id === taskId) task.isTimerOn = false
    //   })
    //   return {
    //     todoData: newTodoData,
    //   }
    // })
    // })
    this.timers = {}

    this.state.todoData.forEach((item) => {
      if (item.isTimerOn) {
        this.timerOn(item.id)
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
