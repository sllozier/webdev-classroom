import React from "react";
import { IconButton } from "@material-ui/core";
import { MenuIcon } from "@material-ui/icons";

const Burger = ({ open, setOpen }) => {
  return (
    <button
      className={`burger-container ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    ></button>
  );
};

export default Burger;
