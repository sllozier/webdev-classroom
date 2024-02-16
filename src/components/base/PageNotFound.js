import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="notFoundContainer">
        <div className="fofContainer">
          4
          <img
            src="boilerplate_fullstack_webpack/public/piccies/images/404_turtle.png"
            alt=""
          />
          4
        </div>
        <div>Oh no! The page you were looking for does not exist</div>
        <Link to="/">
          <div className="not-found-button">
            <button>Home</button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
