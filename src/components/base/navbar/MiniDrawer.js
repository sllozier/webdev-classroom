// MiniDrawer.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  CssBaseline,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Sidebar from "./SideBar";

const MiniDrawer = ({ id }) => {
  const [open, setOpen] = useState(false);
  const accountId = id;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="miniDrawer">
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={`${open ? "hide" : "menuButton"}`}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="persistent"
        open={open}
        className={open ? "drawerOpen" : "drawerClose"}
        classes={{
          paper: open ? "drawerOpen" : "drawerClose",
        }}
      >
        <div className="toolbar">
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Sidebar id={accountId} />
      </Drawer>
      {/* <main className="content">
        <div className="toolbar" /> 
      </main> */}
    </div>
  );
};

export default MiniDrawer;
