import { createSelector } from "@reduxjs/toolkit";

export const countSelector = (state) => state.counter.count;
export const todoListSelector = (state) => state.todo.todoList;
export const selectFilterSelector = (state) => state.todo.selectFilter;

export const doubleCountSelector = createSelector(countSelector, (count) => {
  return count * 2;
});
export const filterTodoListSelector = createSelector(
  todoListSelector,
  selectFilterSelector,
  (todoList, selectFilter) => {
    const filterTodo = filter[selectFilter ?? "ALL"](todoList);
    return filterTodo
  }
);

export const remainSelector = createSelector(
  todoListSelector,
  (todoList) => {
    // console.log("save data");
    // if (typeof window !== "undefined") {
    //   // Client-side-only code
    //   localStorage.setItem("redux-todo-list", JSON.stringify(todoList))
    // }
    const filterTodo = filter["UNCOMPLETE"](todoList);
    return filterTodo.length
  }
);




const filter = {
  ALL: (todoList) => [...todoList],
  COMPLETE: (todoList) => todoList.filter((e) => e.isDone === true),
  UNCOMPLETE: (todoList) => todoList.filter((e) => e.isDone === false),
};