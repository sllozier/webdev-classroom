import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { accountLogin } from "../../../store/reducers/authSlice";

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (props) => (event) => {
    setState({
      ...state,
      [props]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(
      accountLogin({
        username: state.username,
        password: state.password,
      })
    );
    if (auth.isAdmin) {
      navigate("/adminDashboard");
    } else if (!auth.isAdmin) {
      navigate(`/dashboard/${auth.id}`);
    }
  };

  console.log("LOGIN STATE", state);
  return (
    <div id="account-login" className="signup-container">
      <h2>Sign In</h2>
      <form id="login-form" className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          className="form-input"
          name="username"
          type="text"
          value={state.username}
          onChange={handleChange("username")}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange("password")}
        />

        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
      <Link to="/account-nav/signup">Sign up for a new account?</Link>
    </div>
  );
};

export default Login;
