import React, { Component } from "react";
import { formatDistanceToNow, formatDistance, subDays } from "date-fns";

import "./task.css";

export default class Task extends Component {
  state = {
    label: this.props.label,
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.label.trim() === "") {
      const input = event.target.firstElementChild;
      input.value = "";
      input.placeholder = "The task cannot be empty!";
      return;
    }
    const a = event.target.querySelector(".edit").value;
    this.props.updateTask(a, this.props.id);
  };

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
    } = this.props;

    let classNames = "";
    if (completed) {
      classNames += " completed";
    }
    if (editing) {
      classNames += " editing";
    }

    return (
      <>
        <li className={classNames} key={id}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onClick={onToggleCompleted}
              defaultChecked={checked}
            />
            <label>
              <span className="description">{label}</span>
              <span className="created">
                created{" "}
                {formatDistanceToNow(createTime, { includeSeconds: true })}
              </span>
            </label>
            <button
              className="icon icon-edit"
              onClick={onToggleEditing}
            ></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              value={this.state.label}
              onChange={this.onLabelChange}
            />
          </form>
        </li>
      </>
    );
  }
}
