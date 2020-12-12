import React, { useState, useRef } from "react";
import "./Accordion.css";
import CheckBox from "../CheckBox/CheckBox";
import AccordionContent from "../AccordionContent/AccordionContent";
import EditInput from "../EditInput/EditInput";
import { DownOutlined } from "@ant-design/icons";

export default function Accordion({ todo }) {
  const [active, setActive] = useState(false);
  const [editOn, setEditOn] = useState(false);
  const contentRef = useRef(null);

  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const changeAccordion = () => {
    setActive(!active);
  };

  return (
    <div className="accordionDiv">
      <div className={`accordion ${active}`} onClick={changeAccordion}>
        <CheckBox todo={todo} />
        <span className="accordionTitle">{todo.title}</span>
        <EditInput
          inputType="title"
          editOn={editOn}
          editedTodo={editedTodo}
          setEditedTodo={setEditedTodo}
        />
        <DownOutlined
          style={{
            fontSize: "20px",
            transform: active ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>
      <div className="accordionContent" ref={contentRef}>
        <AccordionContent
          todo={todo}
          contentRef={contentRef}
          active={active}
          editOn={editOn}
          setEditOn={setEditOn}
          editedTodo={editedTodo}
          setEditedTodo={setEditedTodo}
        />
      </div>
    </div>
  );
}
