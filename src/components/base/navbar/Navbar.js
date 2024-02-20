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
import MiniDrawer from "./MiniDrawer";

const Navbar = () => {
  const account = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [createOpened, setCreateOpened] = useRecoilState(createDialogAtom);
  const [joinOpened, setJoinOpened] = useRecoilState(joinDialogAtom);

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
        <MiniDrawer id={account.id} />

        <Link to={`/dashboard/${account.id}`}>
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
