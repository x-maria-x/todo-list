import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

function Task({ onDeleted, onToggleCompleted, onToggleEditing, updateTask, timerOn, timerOff, ...task }) {
  const [label, setLabel] = useState(task.label)

  function onLabelChange(event) {
    setLabel(event.target.value)
  }

  function onSubmit(event) {
    event.preventDefault()

    const { id } = task

    if (!label.trim()) {
      const input = event.target.firstElementChild
      input.value = ''
      input.placeholder = 'The task cannot be empty!'
      return
    }

    updateTask(label, id)
  }

  function getPadTime(time) {
    return time.toString().padStart(2, '0')
  }

  const { label: labelProps, id, checked, completed, editing, createTime, time } = task

  let classNames = ''
  if (completed) {
    classNames += ' completed'
  }
  if (editing) {
    classNames += ' editing'
  }

  const min = getPadTime(Math.floor(time / 60))
  const sec = getPadTime(time - min * 60)

  const timer = () => {
    if (time)
      return (
        <>
          <div className="timer">{`${min}:${sec}`}</div>
          <div className="timer-button">
            <button className="icon icon-play" type="button" aria-label="play" onClick={() => timerOn()} />
            <button className="icon icon-pause" type="button" aria-label="pause" onClick={() => timerOff()} />
          </div>
        </>
      )
    if (time === 0) return <span className="time-over">Time over</span>
    return null
  }

  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={() => onToggleCompleted()}
          defaultChecked={checked}
          id={id}
        />
        <label htmlFor={id}>
          <span className="title">{labelProps}</span>
          <span className="description">{timer()}</span>
          <span className="created">created {formatDistanceToNow(createTime, { includeSeconds: true })}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onToggleEditing()} type="button" aria-label="Editing" />
        <button className="icon icon-destroy" onClick={() => onDeleted()} type="button" aria-label="Deleted" />
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input type="text" className="edit" value={label} onChange={(e) => onLabelChange(e)} name="task" />
      </form>
    </li>
  )
}
export default Task

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
