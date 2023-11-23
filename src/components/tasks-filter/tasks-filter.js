import React from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

function TasksFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttonsRender = buttons.map(({ name, label }) => {
    const isActive = filter === name
    const classBtn = isActive ? 'selected' : ''
    return (
      <li key={name}>
        <button className={classBtn} onClick={() => onFilterChange(name)} type="button">
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttonsRender}</ul>
}

export default TasksFilter

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  onFilterChange: PropTypes.func,
}

TasksFilter.defaultProps = {
  filter: '',
  onFilterChange: () => {},
}
