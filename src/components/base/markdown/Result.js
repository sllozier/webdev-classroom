import React, { useContext } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import EditorContext from "./EditorContext";
import rehypeRaw from "rehype-raw";

const Result = ({ markdownText }) => {
  console.log("RESULT", markdownText);
  return (
    <div className="result_container">
      <div className="result_area">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget="_blank">
          {markdownText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Result;
