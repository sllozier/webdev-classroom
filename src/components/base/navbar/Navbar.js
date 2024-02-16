import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../store/reducers/authSlice";
import { fetchAccountData } from "../../../store/reducers/accountSlice";
import Burger from "./Burger";
import Menu from "./Menu";

const Navbar = () => {
  const account = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (account.id) dispatch(fetchAccountData(account.id));
  }, [account.id]);

  const logoutAccount = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return account.id ? (
    <div className="navbar">
      <div className="navbar_left">
        <Burger open={open} setOpen={setOpen} />

        <Link to="/">
          <img
            src="https://gist.github.com/sllozier/60ba86e5e2eaa1816d19b2b74e9df67c/raw/2583b15e280ce7711443298efd3f2139e55c2b2e/cc_color_logo.png"
            alt="Logo"
            className="navbar_logo"
          />
        </Link>
      </div>
      <div className="navbar_right">
        <button onClick={toggleDropdown} className="icon-button">
          <i className="fa-solid fa-plus"></i>
        </button>
        <div className="icon-button" onClick={logoutAccount}>
          <img
            src={account.picture}
            alt="User Avatar"
            className="navbar__user-avatar"
          />
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            {/* Implement your logic for creating or joining a class */}
            <button onClick={() => console.log("Create Class")}>
              Create Class
            </button>
            <button onClick={() => console.log("Join Class")}>
              Join Class
            </button>
          </div>
        )}
      </div>
      <Menu open={open} setOpen={setOpen} />
    </div>
  ) : (
    <Link to="/login">
      <h1>You need to login</h1>
    </Link>
  );
};

export default Navbar;
