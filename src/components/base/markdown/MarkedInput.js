import React, { useContext } from "react";
import styled from "styled-components";
import editorContext from "../editorContext";

const MarkedInput = (props) => {
  const { setMarkdownText } = useContext(editorContext);

  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setMarkdownText(newValue);
  };

  return (
    <Container>
      <TextArea onChange={onInputChange} />
    </Container>
  );
};

export default MarkedInput;
