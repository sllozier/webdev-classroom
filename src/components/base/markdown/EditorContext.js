import React, { createContext, useState } from "react";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);

  const addAssignment = (text) => {
    const newAssignment = {
      id: assignments.length + 1,
      title: `Assignment ${assignments.length + 1}`,
      text: text,
    };
    setAssignments([...assignments, newAssignment]);
  };

  return (
    <EditorContext.Provider value={{ assignments, addAssignment }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContext;
