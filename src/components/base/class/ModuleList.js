import { IconButton } from "@material-ui/core";
import { MoreVert, Check } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useNavigate } from "react-router-dom";
import { fetchModules } from "../../../store/reducers/accountSlice";

const ModuleList = ({ account, singleClass }) => {
  const moduleList = useSelector((state) => state.account.moduleList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchModules(account.id, singleClass.id));
  }, [account.id, singleClass.id, dispatch]);

  console.log("MOD LIST COMP", singleClass.id);

  return (
    <div className="module_listBox">
      {moduleList?.map((module) => (
        <div
          className="announcement"
          key={module.id}
          onClick={() => navigate(`/modules/${module.id}`)}
        >
          <div className="announcement_infoContainer">
            <div className="announcement_infoSection">
              <div className="announcement_imageContainer">
                <img src={module.image} alt="Account Photo" />
              </div>
              <div className="announcement_nameAndDate">
                <div className="announcement_name">{module.name}</div>
                <div>
                  <IconButton disabled={!module.complete}>
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
          <div className="announcement_content">{module.description}</div>
        </div>
      ))}
    </div>
  );
};

export default ModuleList;
