import { createSelector } from "@reduxjs/toolkit";

export const countSelector = (state) => state.counter.count;

export const doubleCountSelector = createSelector(countSelector, (count) => {
  return count * 2;
});
