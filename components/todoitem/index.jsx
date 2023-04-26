import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import React from "react";

const TodoItem = ({todo, changeStatusJob, confirmDeleteJob}) => {
  return (
    <>
      <Checkbox
        onChange={() => changeStatusJob(todo.id)}
        checked={todo.isDone}
        inputId={todo.id}
      ></Checkbox>
      <label
        htmlFor={todo.id}
        className={`ml-2 ${todo.isDone ? "line-through" : ""}`}
      >
        {todo.jobName}
      </label>
      <Button
        icon="pi pi-times"
        rounded
        text
        severity="danger"
        aria-label="Cancel"
        onClick={(e) => confirmDeleteJob(e, todo.id)}
      />
    </>
  );
};

export default TodoItem;
