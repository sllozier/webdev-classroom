import React from "react";

const Burger = ({ open, setOpen }) => {
  return (
    <button
      className={`burger-container ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <div className="burger-div"></div>
      <div className="burger-div"></div>
      <div className="burger-div"></div>
    </button>
  );
};

export default Burger;
