import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { grey } from "material-ui-colors";
import { SendOutlined } from "@material-ui/icons";
import moment from "moment";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";

import {
  fetchAnnouncements,
  addAnnouncement,
  fetchModules,
  fetchClassData,
} from "../../../store/reducers/accountSlice";
import Announcement from "./Announcement";
import ClassNavbar from "../navbar/ClassNavbar";

import ModuleList from "./ModuleList";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: "100%" }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Class = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth);
  const singleClass = useSelector((state) => state.account.classData);
  const announcements = useSelector((state) => state.account.announcements);
  const moduleList = useSelector((state) => state.account.moduleList);
  const [form, setForm] = useState({
    authorId: account.id,
    content: "",
    date: moment().format("YYYY-MM-DD"),
    image: account.image,
    creatorName: account.fName,
    classId: params.id,
  });

  const [value, setValue] = useState(0);
  const primary = grey[700];

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (prop) => (event) => {
    setForm({
      ...form,
      [prop]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addAnnouncement(
        {
          authorId: form.authorId,
          content: form.content,
          date: form.date,
          image: form.image,
          creatorName: form.creatorName,
          classId: form.classId,
        },
        account.id,
        params.id
      )
    );
  };

  useEffect(() => {}, [form]);

  useEffect(() => {
    dispatch(fetchClassData(account.id, params.id));
    dispatch(fetchAnnouncements(account.id, params.id));
    dispatch(fetchModules(account.id, params.id));
  }, [account.id, params.id, dispatch]);

  console.log("CLASS COMP");

  return (
    <>
      <ClassNavbar singleClass={singleClass} />
      <div className="class_container">
        <Box sx={{ width: "100%" }}>
          <div className="class_boxContainer">
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Announcements" {...a11yProps(0)} />
                <Tab label="Modules" {...a11yProps(1)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <div className="class">
                <div className="class_nameBox">
                  <div className="class_name">{singleClass.name}</div>
                </div>
                <form className="class_announce" onSubmit={handleSubmit}>
                  <img src={account.image} alt="Account Image" />
                  <input
                    type="text"
                    value={form.content}
                    onChange={handleChange("content")}
                    placeholder="Announce something to your class"
                  />
                  <IconButton type="submit">
                    <SendOutlined />
                  </IconButton>
                </form>
                {announcements?.map((announcement) => (
                  <Announcement
                    content={announcement.content}
                    date={announcement.date}
                    image={announcement.image}
                    name={announcement.creatorName}
                    key={announcement.id}
                  />
                ))}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="class">
                <ModuleList account={account} singleClass={singleClass} />
                {/* {moduleList?.map((module) => (
                  <ModuleList
                    name={module.name}
                    complete={module.isComplete}
                    image={module.image}
                    description={module.description}
                    key={module.id}
                  />
                ))} */}
              </div>
            </CustomTabPanel>
          </div>
        </Box>

        {/* <div className="class">
        <div className="class_nameBox">
          <div className="class_name">{singleClass.name}</div>
        </div>
        <form className="class_announce" onSubmit={handleSubmit}>
          <img src={account.image} alt="Account Image" />
          <input
            type="text"
            value={form.content}
            onChange={handleChange("content")}
            placeholder="Announce something to your class"
          />
          <IconButton type="submit">
            <SendOutlined />
          </IconButton>
        </form>
        {announcements?.map((announcement) => (
          <Announcement
            content={announcement.content}
            date={announcement.date}
            image={announcement.image}
            name={announcement.creatorName}
            key={announcement.id}
          />
        ))}
      </div> */}
      </div>
    </>
  );
};

export default Class;
