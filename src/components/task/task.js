import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

export default class Task extends Component {
  label = this.props.label

  state = {
    label: this.label,
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()

    const { label } = this.state
    const { updateTask, id } = this.props

    if (!label.trim()) {
      const input = event.target.firstElementChild
      input.value = ''
      input.placeholder = 'The task cannot be empty!'
      return
    }

    updateTask(label, id)
  }

  static getPadTime = (time) => time.toString().padStart(2, '0')

  render() {
    const {
      label,
      id,
      onDeleted,
      checked,
      onToggleCompleted,
      onToggleEditing,
      completed,
      editing,
      createTime,
      time,
      timerOn,
      timerOff,
    } = this.props
    const { label: labelState } = this.state

    let classNames = ''
    if (completed) {
      classNames += ' completed'
    }
    if (editing) {
      classNames += ' editing'
    }

    const min = Task.getPadTime(Math.floor(time / 60))
    const sec = Task.getPadTime(time - min * 60)

    const timer = () => {
      if (time)
        return (
          <>
            <div className="timer">{`${min}:${sec}`}</div>
            <div className="timer-button">
              <button className="icon icon-play" type="button" aria-label="play" onClick={timerOn} />
              <button className="icon icon-pause" type="button" aria-label="pause" onClick={timerOff} />
            </div>
          </>
        )
      if (time === 0) return <span className="time-over">Time over</span>
      return null
    }

    return (
      <li className={classNames} key={id}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={checked} id={id} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">{timer()}</span>
            <span className="created">created {formatDistanceToNow(createTime, { includeSeconds: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing} type="button" aria-label="Editing" />
          <button className="icon icon-destroy" onClick={onDeleted} type="button" aria-label="Deleted" />
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={labelState} onChange={this.onLabelChange} name="task" />
        </form>
      </li>
    )
  }
}

Task.propTypes = {
  todo: PropTypes.shape({
    label: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    checked: PropTypes.bool,
    id: PropTypes.number,
    createTime: PropTypes.instanceOf(Date),
  }),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  updateTask: PropTypes.func,
  timerOn: PropTypes.func,
  timerOff: PropTypes.func,
}

Task.defaultProps = {
  todo: {},
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  updateTask: () => {},
  timerOn: () => {},
  timerOff: () => {},
}
