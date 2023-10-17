import React, { Component } from "react";
import TasksFilter from "../tasks-filter/tasks-filter";

import "./footer.css";

export default class Footer extends Component {
  render() {
    const { toDo, filter, onFilterChange, clearComplitedTasks } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{toDo} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={clearComplitedTasks}>
          Clear completed
        </button>
      </footer>
    );
  }
}
