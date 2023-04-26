import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";

const TodoList = () => {
  const [jobName, setJobName] = useState("");
  const [checked, setChecked] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [todoListFilter, setTodoListFilter] = useState([]);
  const inputRef = useRef(null);
  const optionsSelectValue = ["ALL", "COMPLETE", "UNCOMPLETE"];
  const [selectValue, setSelectValue] = useState(optionsSelectValue[0]);

  const getRandamId = () => {
    return Date.now().toString();
  };

  const addItem = () => {
    if (!jobName) return;
    const newTodo = {
      id: getRandamId(),
      jobName,
      isDone: false,
    };
    setTodoList((prevState) => [...prevState, newTodo]);
    setJobName("");
    inputRef.current.focus();
  };

  const changeStatusJob = (id) => {
    setTodoList((prevState) => {
      const newState = prevState.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      return newState;
    });
  };

  const deleteJob = (id) => {
    setTodoList((prevState) => {
      const newState = prevState.filter((todo) => todo.id !== id);
      return newState;
    });
  };

  const filter = {
    ALL: todoList => [...todoList],
    COMPLETE: todoList => todoList.filter(e => e.isDone === true),
    UNCOMPLETE: todoList => todoList.filter(e => e.isDone === false),
  }

  // filter
  useEffect( () => {
    console.log(selectValue)
    const filterTodo = filter[selectValue ?? "ALL"](todoList)
    setTodoListFilter(() => {
      return filterTodo
    });

  },[selectValue, todoList])

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Todo List</h5>
          <InputText
            ref={inputRef}
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            onKeyUp={(e) => {
              e.key == "Enter" && addItem();
            }}
          />
          <Button
            className="ml-2"
            icon="pi pi-plus"
            severity="success"
            aria-label="Search"
            onClick={addItem}
          />

          <div className="my-2">
            {todoListFilter.map((todo) => (
              <div className="flex align-items-center my-2" key={todo.id}>
                <Checkbox
                  onChange={() => changeStatusJob(todo.id)}
                  checked={todo.isDone}
                  inputId={todo.id}
                ></Checkbox>
                <label htmlFor={todo.id} className="ml-2">
                  {todo.jobName}
                </label>
                <Button
                  icon="pi pi-times"
                  rounded
                  text
                  severity="danger"
                  aria-label="Cancel"
                  onClick={() => deleteJob(todo.id)}
                />
              </div>
            ))}
          </div>

          <div>
            <SelectButton
              value={selectValue}
              onChange={(e) => setSelectValue(e.value)}
              options={optionsSelectValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
