import React from "react";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { counterAction } from "../../../stores/counter-slice";
import { doubleCountSelector } from "../../../stores/selector";

const ReduxCPN = () => {
  const dispatcher = useDispatch();

  const counter = useSelector((state) => state.counter);
  const doubleCount = useSelector(doubleCountSelector);

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>redux</h5>
          <div className="flex align-items-center">
            <div>{counter.count}</div>
            <Button
              className="ml-2"
              icon="pi pi-plus"
              rounded
              text
              severity="success"
              aria-label="add"
              onClick={() => dispatcher(counterAction.increment())}
            />
            <Button
              className="ml-2"
              rounded
              text
              severity="success"
              label="add 10"
              onClick={() => dispatcher(counterAction.add(10))}
            />
            <div>{doubleCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReduxCPN;
