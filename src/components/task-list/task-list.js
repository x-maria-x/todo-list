import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'

import './task-list.css'

function TaskList({ todos, onDeleted, onToggleCompleted, onToggleEditing, updateTask, timerOn, timerOff }) {
  const elements = todos.map((item) => (
    <span key={item.id}>
      <Task
        {...item}
        onDeleted={() => onDeleted(item.id)}
        onToggleCompleted={() => onToggleCompleted(item.id)}
        onToggleEditing={() => onToggleEditing(item.id)}
        updateTask={(newLabel, id) => updateTask(newLabel, id)}
        timerOn={(e) => timerOn(item.id, e)}
        timerOff={(e) => timerOff(item.id, e)}
      />
    </span>
  ))

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  updateTask: PropTypes.func,
  timerOn: PropTypes.func,
  timerOff: PropTypes.func,
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  updateTask: () => {},
  timerOn: () => {},
  timerOff: () => {},
}

export default TaskList
