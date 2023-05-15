import React from "react";
import "./Title.css";

const HandwrittenTitle = ({ text }) => {
  return (
    <h1 className="handwritten-title">
      <span>{text}</span>
    </h1>
  );
};

export default HandwrittenTitle;
