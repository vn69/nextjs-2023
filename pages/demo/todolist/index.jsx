import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";
import { Chip } from "primereact/chip";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

const TodoListPage = () => {
  const [jobName, setJobName] = useState("");
  const todoStoreName = "localStorage_todo";
  const [todoList, setTodoList] = useState([]);
  const [todoListFilter, setTodoListFilter] = useState([]);
  const inputRef = useRef(null);
  const optionsSelectValue = ["ALL", "COMPLETE", "UNCOMPLETE"];
  const [selectValue, setSelectValue] = useState(optionsSelectValue[0]);
  const [remaining, setRemaining] = useState(0);

  const toast = useRef(null);

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
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Job is added successfully",
      life: 3000,
    });
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
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have removed the job",
      life: 3000,
    });
  };

  const confirmDeleteJob = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteJob(id),
      reject,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const clearTodo = () => {
    setTodoList((prevState) => {
      const newState = filter["UNCOMPLETE"](prevState);
      return newState;
    });
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have removed the all complete job",
      life: 3000,
    });
  };
  const confirmClearTodo = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: clearTodo,
      reject,
    });
  };

  const filter = {
    ALL: (todoList) => [...todoList],
    COMPLETE: (todoList) => todoList.filter((e) => e.isDone === true),
    UNCOMPLETE: (todoList) => todoList.filter((e) => e.isDone === false),
  };

  // filter
  useEffect(() => {
    const filterTodo = filter[selectValue ?? "ALL"](todoList);
    setTodoListFilter(() => {
      return filterTodo;
    });
  }, [selectValue, todoList]);

  // init data
  useEffect(() => {
    console.log("init data");
    const saved = localStorage.getItem(todoStoreName);
    if (saved) {
      setTodoList(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    console.log("change data");
    localStorage.setItem(todoStoreName, JSON.stringify(todoList));
    setRemaining(filter["UNCOMPLETE"](todoList).length);
  }, [todoList]);

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
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
              disabled={jobName === ""}
            />

            <div className="my-2">
              {todoListFilter.map((todo) => (
                <div className="flex align-items-center my-2" key={todo.id}>
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
                </div>
              ))}
            </div>

            {todoList.length > 0 && (
              <div className="flex">
                <Chip label={`${remaining} item left`} />
                <SelectButton
                  className="mx-2"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.value)}
                  options={optionsSelectValue}
                />
                <Button
                  severity="danger"
                  aria-label="Cancel"
                  label="Clear"
                  disabled={remaining >= todoList.length}
                  onClick={confirmClearTodo}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoListPage;
