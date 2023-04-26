import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { SelectButton } from "primereact/selectbutton";
import React from "react";

const FooterItem = ({ remaining, selectValue, optionsSelectValue, todoList, confirmClearTodo, updateSelectValue}) => {
  return (
    <>
      <div className="flex">
        <Chip label={`${remaining} item left`} />
        <SelectButton
          className="mx-2"
          value={selectValue}
          onChange={updateSelectValue}
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
    </>
  );
};

export default FooterItem;
