import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoAction } from "../../../stores/todo-slice";

import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import TodoItem from "../../../components/todoitem";
import TodoHeader from "../../../components/todoheader";
import TodoFooter from "../../../components/todofooter";
import { filterTodoListSelector, remainSelector } from "../../../stores/selector";

const TodoListCpnPage = () => {
  const toast = useRef(null);
  const dispatcher = useDispatch();
  const todoStore = useSelector((state) => state.todo);
  const filterTodoList = useSelector(filterTodoListSelector);
  const remaining = useSelector(remainSelector);

  const getRandamId = () => {
    return Date.now().toString();
  };

  const addItem = (jobName) => {
    if (!jobName) return;
    const newTodo = {
      id: getRandamId(),
      jobName,
      isDone: false,
    };
    dispatcher(todoAction.addTodo(newTodo));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Job is added successfully",
      life: 3000,
    });
  };

  const changeStatusJob = (id) => {
    dispatcher(todoAction.changeStatus(id));
  };

  const deleteJob = (id) => {
    console.log(id);
    dispatcher(todoAction.deleteJob(id));
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

  const optionsSelectValue = ["ALL", "COMPLETE", "UNCOMPLETE"];
  const updateSelectValue = (e) => {
    dispatcher(todoAction.updateSelectFitler(e.value))
  };

  const clearTodo = () => {
    console.log("clearTodo");
    dispatcher(todoAction.clearTodo())
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
              {filterTodoList.map((todo) => (
                <div className="flex align-items-center" key={todo.id}>
                  <TodoItem
                    todo={todo}
                    changeStatusJob={changeStatusJob}
                    confirmDeleteJob={confirmDeleteJob}
                  ></TodoItem>
                </div>
              ))}
            </div>

            {todoStore.todoList.length > 0 && (
              <TodoFooter
                remaining={remaining}
                selectValue={todoStore.selectFilter}
                updateSelectValue={updateSelectValue}
                optionsSelectValue={optionsSelectValue}
                todoList={todoStore.todoList}
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
