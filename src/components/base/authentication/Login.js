import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { accountLogin } from "../../../store/reducers/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginSuccess = useSelector((state) => state.auth.loginSuccess);
  const account = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(accountLogin(form));
  };

  const handleChange = (props) => (event) => {
    setForm({
      ...form,
      [props]: event.target.value,
    });
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate(`/dashboard/${account.id}`);
    }
  }, [loginSuccess, navigate]);

  return (
    <div id="account-login" className="signup-container">
      <h2>Sign In</h2>
      <form id="login-form" className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          className="form-input"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange("username")}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          name="password"
          type="password"
          value={form.password}
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
