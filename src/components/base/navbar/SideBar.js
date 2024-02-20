// Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader,
} from "@material-ui/core";
import {
  Home,
  CalendarToday,
  SchoolOutlined,
  ArchiveOutlined,
  SettingsOutlined,
} from "@material-ui/icons";

const Sidebar = ({ id }) => {
  const navigate = useNavigate();

  const items = [
    {
      text: "Home",
      icon: <Home />,
      onClick: () => navigate(`/dashboard/${id}`),
    },
    {
      text: "Calendar",
      icon: <CalendarToday />,
      onClick: () => navigate(`/dashboard/${id}`),
    },
    {
      text: "Enrolled",
      icon: <SchoolOutlined />,
      onClick: () => navigate(`/dashboard/${id}`),
    },
    {
      text: "Archived",
      icon: <ArchiveOutlined />,
      onClick: () => navigate(`/dashboard/${id}`),
    },
    {
      text: "Settings",
      icon: <SettingsOutlined />,
      onClick: () => navigate(`/dashboard/${id}`),
    },
  ];

  return (
    <>
      <List>
        {items.map((item, index) => (
          <ListItem button key={item.text} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText className="nav-span" primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Additional sections or items can be added here */}
    </>
  );
};

export default Sidebar;
