import { IconButton, Tabs, Tab, Typography, Box } from "@material-ui/core";

import { MoreVert, Check } from "@material-ui/icons";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  fetchModuleData,
  fetchAssignments,
  fetchClassData,
} from "../../../store/reducers/accountSlice";
import ModuleNavbar from "../navbar/ModuleNavbar";
import EditorContext from "../markdown/EditorContext";
import Result from "../markdown/Result";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Module = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const account = useSelector((state) => state.auth);
  const module = useSelector((state) => state.account.moduleData);
  const assignments = useSelector((state) => state.account.assignmentList);
  const singleClass = useSelector((state) => state.account.classData);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    dispatch(fetchModuleData(account.id, params.id));
    dispatch(fetchAssignments(account.id, params.id));
    if (module.classId) {
      dispatch(fetchClassData(account.id, module.classId));
    }
  }, [account.id, module.classId, params.id, dispatch]);

  const handleTabChange = (event, newValue) => {
    console.log("HANDLE TAB VAL", newValue);
    setValue(newValue);
  };

  console.log("MOD COMP", assignments);

  return (
    <>
      <div>
        <ModuleNavbar singleModule={module} singleClass={singleClass} />
      </div>

      {/* <div>
        {assignments?.map((assignment) => (
          <>
            <h1>{assignment.title}</h1>
            <h3>{assignment.description}</h3>
            <p>
              <Result markdownText={assignment.text} />
            </p>
          </>
        ))}
      </div> */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {assignments.map((assignment, index) => (
            <Tab
              key={assignment.id}
              label={`${assignment.id}. ${assignment.title}`}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
        {assignments.map((assignment, index) => (
          <TabPanel
            className="module_tabPanel"
            key={assignment.id}
            value={value}
            index={index}
          >
            <Result markdownText={assignment.text} />
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default Module;
