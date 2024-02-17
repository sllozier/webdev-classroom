import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { AssignmentIndOutlined, FolderOpenOutlined } from "@material-ui/icons";

const ClassCard = ({ name, subject, id, style }) => {
  const navigate = useNavigate();

  const enterClass = () => {
    navigate(`/classes/${id}`);
  };

  return (
    <>
      <div className="classCard" style={style} onClick={enterClass}>
        <div className="classCard_upper">
          <div className="classCard_name">{name}</div>
          <div className="classCard_subject">{subject}</div>
          {/* <img src={class.photo} className="classCard_photo"/> */}
        </div>
        <div className="classCard_middle"></div>
        <div className="classCard_lower">
          <IconButton>
            <FolderOpenOutlined />
          </IconButton>
          <IconButton>
            <AssignmentIndOutlined />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
