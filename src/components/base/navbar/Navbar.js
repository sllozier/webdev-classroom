import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  MenuItem,
  Menu,
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  SwipeableDrawer,
  ListSubheader,
} from "@material-ui/core";
import {
  SettingsOutlined,
  ArchiveOutlined,
  SchoolOutlined,
  CalendarToday,
  Home,
  Inbox,
  Mail,
  Add,
  Apps,
  Menu as BurgerIcon,
} from "@material-ui/icons";
import { logout } from "../../../store/reducers/authSlice";
import { fetchAccountData } from "../../../store/reducers/accountSlice";
import { createDialogAtom, joinDialogAtom } from "../../../utils/atoms";
import { useRecoilState } from "recoil";
import Burger from "./Burger";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
  const account = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [createOpened, setCreateOpened] = useRecoilState(createDialogAtom);
  const [joinOpened, setJoinOpened] = useRecoilState(joinDialogAtom);
  const list = ["Home", "Calendar", "Enrolled", "Archived", "Settings"];
  const position = "left";
  const [drawerState, setDrawerState] = useState({
    [position]: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [side]: open });
  };

  const drawerList = (side) => (
    <div
      className={list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {drawerState[position]}
          </ListSubheader>
        }
      >
        {["Home", "Calendar"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Home /> : <CalendarToday />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Enrolled"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <SchoolOutlined />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Archived", "Settings"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <ArchiveOutlined /> : <SettingsOutlined />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  useEffect(() => {
    if (account.id) dispatch(fetchAccountData(account.id));
  }, [account.id]);

  const logoutAccount = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return account.id ? (
    <div className="navbar">
      <div className="navbar_left">
        <IconButton
          area-label="Open drawer"
          edge="start"
          onClick={toggleDrawer(position, true)}
          className="simple-menu"
        >
          <BurgerIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={position}
          open={drawerState[position]}
          onClose={toggleDrawer(position, false)}
          onOpen={toggleDrawer(position, true)}
        >
          {drawerList(position)}
        </SwipeableDrawer>
        {/* <Burger open={open} setOpen={setOpen} /> */}
        <Link to="/">
          <img
            src="https://gist.github.com/sllozier/60ba86e5e2eaa1816d19b2b74e9df67c/raw/fa0ba8c19c2bed5e992254938f02107112682dc8/cc_tech_color_shortrect_trans.png"
            alt="Logo"
            className="navbar_logo"
          />
          <span className="nav-span">Classroom</span>
        </Link>
      </div>
      <div className="navbar_right">
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Add />
        </IconButton>
        <IconButton onClick={logoutAccount}>
          <Avatar src={account?.image} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              setCreateOpened(true);
              handleClose();
            }}
          >
            Create Class
          </MenuItem>
          <MenuItem
            onClick={() => {
              setJoinOpened(true);
              handleClose();
            }}
          >
            Join Class
          </MenuItem>
        </Menu>
      </div>
      {/* <BurgerMenu open={open} setOpen={setOpen} /> */}
    </div>
  ) : (
    <Link to="/login">
      <h1>You need to login</h1>
    </Link>
  );
};

export default Navbar;
