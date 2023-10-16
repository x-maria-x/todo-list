import React, { Component } from "react";

import Task from "./task";

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleCompleted, onToggleEditing, updateTask } =
      this.props;

    const elements = todos.map((item) => {
      return (
        <span key={item.id}>
          <Task
            {...item}
            onDeleted={() => onDeleted(item.id)}
            onToggleCompleted={() => onToggleCompleted(item.id)}
            onToggleEditing={() => onToggleEditing(item.id)}
            updateTask={(newLabel, id) => updateTask(newLabel, id)}
          />
        </span>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
