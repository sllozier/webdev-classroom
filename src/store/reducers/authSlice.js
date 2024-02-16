import { createSlice } from "@reduxjs/toolkit";
import history from "../../utils/history";
const axios = require("axios");
import { fetchAccountData } from "./accountSlice";

// === current approach to user information: === //
// TOKEN is stored in localStorage
// USER data is in store (email, name, etc (not pw))

const authSlice = createSlice({
  name: "authSlice",
  initialState: {},
  reducers: {
    setAuth: (state, action) => {
      state = action.payload;
      return state;
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      return {};
    },
  },
});

export default authSlice.reducer;
export const { setAuth, logout } = authSlice.actions;

export const fetchVerifiedAccount = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data: account } = await axios.get("/api/auth", {
          headers: {
            authorization: token,
          },
        });
        dispatch(fetchAccountData(account.id));
        dispatch(setAuth(account));
      }
    } catch (error) {
      console.log("VERIFY ACCOUNT ERROR", error);
    }
  };
};

// verifies credentials, stores token in localStorage, logs in
export const accountLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const { data: account } = await axios.post(
        "/api/auth/login",
        credentials
      );
      window.localStorage.setItem("token", account);
      dispatch(fetchVerifiedAccount());
      history.push(`/dashboard/${account.id}`);
    } catch (error) {
      console.log("LOGIN ERROR", error);
    }
  };
};

export const googleOAuthLogin = (googleUserData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/api/auth/google-login",
        googleUserData
      );
      const { token, user } = response.data;

      // Store the token in localStorage
      window.localStorage.setItem("token", token);

      // Dispatch an action to set the user's auth state
      dispatch(fetchAccountData(user.id));
      dispatch(setAuth(user));

      // Redirect the user to their dashboard or home page
      //history.push(`/dashboard`);
    } catch (error) {
      console.log("GOOGLE OAUTH LOGIN ERROR", error);
    }
  };
};

// creates an account, generates token, and logs in
export const signup = (credentials) => {
  return async (dispatch) => {
    try {
      const { data: account } = await axios.post(
        "/api/auth/signup",
        credentials
      );
      window.localStorage.setItem("token", account.token);
      dispatch(setAuth(account));
      // history.push("/");
    } catch (error) {
      console.log("SIGNUP ERROR", error);
    }
  };
};

// // allows users to stay logged in when refreshing the page
// export const verifyToken = (token) => async (dispatch) => {
//     const { data: user } = await axios.get("/api/auth", {
//         headers: { authorization: token }
//     });
//     if (user?.email) {
//         dispatch(setLoggedInUser(user));
//         return true;
//     } else {
//         dispatch(setLoggedInUser(user));
//         localStorage.removeItem("token");
//         return false;
//     }
// }
