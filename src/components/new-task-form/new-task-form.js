import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

function NewTaskForm({ addTask }) {
  const [label, setLabel] = useState('')
  const [minValue, setMinValue] = useState('')
  const [secValue, setSecValue] = useState('')
  const [invalid, setInvalid] = useState(false)

  function onLabelChange(event) {
    setLabel(event.target.value)
  }

  function onChangeTimerValue(event) {
    setInvalid(false)
    if (event.target.name === 'minValue') setMinValue(event.target.value)
    if (event.target.name === 'secValue') setSecValue(event.target.value)
  }

  function onSubmit(event) {
    event.preventDefault()

    const min = Number(minValue.trim())
    const sec = Number(secValue.trim())

    if (Number.isNaN(min) || Number.isNaN(sec)) {
      setInvalid(true)
      return
    }

    let time = min * 60 + sec
    if (time === 0) {
      time = null
    }
    addTask(label, time)

    setLabel('')
    setMinValue('')
    setSecValue('')
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className={invalid ? 'new-todo-form invalid' : 'new-todo-form'}>
      <input
        className="new-todo"
        name="new-task"
        placeholder="What needs to be done?"
        onChange={(e) => onLabelChange(e)}
        value={label}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        name="minValue"
        placeholder="Min"
        value={minValue}
        onChange={(e) => onChangeTimerValue(e)}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        name="secValue"
        placeholder="Sec"
        value={secValue}
        onChange={(e) => onChangeTimerValue(e)}
      />
      <input type="submit" style={{ display: 'none' }} />
    </form>
  )
}

export default NewTaskForm

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}
