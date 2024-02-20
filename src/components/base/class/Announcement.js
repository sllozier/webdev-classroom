import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React from "react";

const Announcement = ({ content, date, image, name }) => {
  console.log("ANNOUN COMP");
  return (
    <div className="announcement">
      <div className="announcement_infoContainer">
        <div className="announcement_infoSection">
          <div className="announcement_imageContainer">
            <img src={image} alt="Account Photo" />
          </div>
          <div className="announcement_nameAndDate">
            <div className="announcement_name">{name}</div>
            <div className="announcement_date">{date}</div>
          </div>
        </div>
        <div className="announcement_infoSection">
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="announcement_content">{content}</div>
    </div>
  );
};

export default Announcement;
