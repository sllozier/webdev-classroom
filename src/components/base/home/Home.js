import React, { useEffect } from "react";
import { useHistory, Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { googleOAuthLogin } from "../../../store/reducers/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
//can import separate components if Homepage needs a ton of stuff

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const responseGoogle = (response) => {
    console.log(response);
    const userObject = jwtDecode(response.credential);
    const googleUserData = {
      googleId: userObject.sub,
      email: userObject.email,
      name: userObject.name,
      picture: userObject.picture,
    };
    // console.log(userObject);
    // localStorage.setItem("user", JSON.stringify(userObject));
    // const { name, sub, picture } = userObject;
    // const doc = {
    //   _id: sub,
    //   _type: "user",
    //   userName: name,
    //   image: picture,
    //};
    dispatch(googleOAuthLogin(googleUserData));
    // client.createIfNotExists(doc).then(() => {
    //   navigate("/", { replace: true });
    // });
  };

  return (
    <div className="home">
      <div className="home_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png"
          alt="Google Classroom"
          className="home_image"
        />
        <div className="button-container">
          <button className="home_login" onClick={handleLogin}>
            Login with Email
          </button>
          <GoogleLogin
            render={(renderProps) => (
              <button
                type="button"
                className=""
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="" /> SIGN IN WITH GOOGLE
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
          {/* <button className="continue_google" onClick={googleLogin}>
            <i class="fa-brands fa-google" id="continue_google"></i>
            Continue with google
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
