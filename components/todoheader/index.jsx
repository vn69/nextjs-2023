import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";

const TodoHeader = ({addItem}) => {
  const [jobName, setJobName] = useState("");
  const inputRef = useRef(null);

  const updateJobName = (e) => {
    setJobName(e.target.value);
  };

  const addJob = () => {
    const name = jobName.trim()
    if (!name) return;
    addItem(name)
    setJobName("");
    inputRef.current.focus();
  }

  return (
    <>
      <InputText
        ref={inputRef}
        value={jobName}
        onChange={updateJobName}
        onKeyUp={(e) => {
          e.key == "Enter" && addJob();
        }}
      />
      <Button
        className="ml-2"
        icon="pi pi-plus"
        severity="success"
        aria-label="Search"
        onClick={addJob}
        disabled={jobName === ""}
      />
    </>
  );
};

export default TodoHeader;
