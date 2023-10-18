import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/tasks-filter'

import './footer.css'

function Footer({ toDo, filter, onFilterChange, clearComplitedTasks }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearComplitedTasks} type="button">
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  toDo: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  clearComplitedTasks: PropTypes.func.isRequired,
}

Footer.defaultProps = {
  toDo: 0,
  filter: 'all',
}

export default Footer
