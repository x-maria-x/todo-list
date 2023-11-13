import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minValue: '',
    secValue: '',
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onMinChange = (event) => {
    this.setState({
      minValue: event.target.value,
    })
  }

  onSecChange = (event) => {
    this.setState({
      secValue: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { addTask } = this.props
    const { label, minValue, secValue } = this.state

    const min = Number(minValue.trim())
    const sec = Number(secValue.trim())
    let time = min * 60 + sec
    if (time === 0) {
      time = null
    }
    addTask(label, time)
    this.setState({
      label: '',
      minValue: '',
      secValue: '',
    })
  }

  render() {
    const { label, minValue, secValue } = this.state

    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          name="new-task"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          name="new-task-min"
          placeholder="Min"
          value={minValue}
          onChange={this.onMinChange}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          name="new-task-sec"
          placeholder="Sec"
          value={secValue}
          onChange={this.onSecChange}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}
