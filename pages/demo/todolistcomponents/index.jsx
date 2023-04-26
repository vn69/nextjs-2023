import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import TodoItem from "../../../components/todoitem";
import TodoHeader from "../../../components/todoheader";
import TodoFooter from "../../../components/todofooter";

const TodoListCpnPage = () => {
  const todoStoreName = "localStorage_todo_components";
  const [todoList, setTodoList] = useState([]);
  const [todoListFilter, setTodoListFilter] = useState([]);
  const optionsSelectValue = ["ALL", "COMPLETE", "UNCOMPLETE"];
  const [selectValue, setSelectValue] = useState(optionsSelectValue[0]);
  const [remaining, setRemaining] = useState(0);

  const toast = useRef(null);

  const getRandamId = () => {
    return Date.now().toString();
  };

  const updateSelectValue = (e) => {
    setSelectValue(e.value);
  };

  const addItem = (jobName) => {
    if (!jobName) return;
    const newTodo = {
      id: getRandamId(),
      jobName,
      isDone: false,
    };
    setTodoList((prevState) => [...prevState, newTodo]);
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
            <TodoHeader addItem={addItem}></TodoHeader>
            <div className="my-2">
              {todoListFilter.map((todo) => (
                <div className="flex align-items-center" key={todo.id}>
                  <TodoItem
                    todo={todo}
                    changeStatusJob={changeStatusJob}
                    confirmDeleteJob={confirmDeleteJob}
                  ></TodoItem>
                </div>
              ))}
            </div>

            {todoList.length > 0 && (
              <TodoFooter
                remaining={remaining}
                selectValue={selectValue}
                updateSelectValue={updateSelectValue}
                optionsSelectValue={optionsSelectValue}
                todoList={todoList}
                confirmClearTodo={confirmClearTodo}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoListCpnPage;
