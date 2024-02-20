import { IconButton } from "@material-ui/core";
import { MoreVert, Check } from "@material-ui/icons";
import React from "react";

const ModuleList = ({ name, complete, image, description }) => {
  console.log("MODULE INFO", name, complete, image, description);

  return (
    <div className="announcement">
      <div className="announcement_infoContainer">
        <div className="announcement_infoSection">
          <div className="announcement_imageContainer">
            <img src={image} alt="Account Photo" />
          </div>
          <div className="announcement_nameAndDate">
            <div className="announcement_name">{name}</div>
            <div>
              <IconButton disabled={!complete}>
                <Check />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="announcement_infoSection">
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="announcement_content">{description}</div>
    </div>
  );
};

export default ModuleList;
