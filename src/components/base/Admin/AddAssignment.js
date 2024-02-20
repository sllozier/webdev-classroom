import React, { useState, useContext } from "react";
import EditorContext from "../markdown/EditorContext"; // Adjust the import path as necessary

const AddAssignment = () => {
  const [text, setText] = useState("");
  const { addAssignment } = useContext(EditorContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignment(text);
    setText(""); // Reset input field after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="assignmentText">Assignment Text (Markdown):</label>
      <textarea
        id="assignmentText"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Input markdown text here"
      />
      <button type="submit">Add Assignment</button>
    </form>
  );
};

export default AddAssignment;
