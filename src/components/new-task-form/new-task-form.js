import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { addTask } = this.props
    const { label } = this.state
    addTask(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          name="new-task"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
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
