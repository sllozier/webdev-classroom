import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { fetchClassData } from "../../../store/reducers/accountSlice";
import {
  fetchAnnouncements,
  addAnnouncement,
} from "../../../store/reducers/accountSlice";
import Announcement from "./Announcement";
import Navbar from "../navbar/Navbar";

const Class = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth);
  const singleClass = useSelector((state) => state.account.classData);
  const announcements = useSelector((state) => state.account.announcements);
  const [form, setForm] = useState({
    authorId: account.id,
    content: "",
    date: moment().format("YYYY-MM-DD"),
    image: account.image,
    creatorName: account.fName,
    classId: params.id,
  });

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
  }, [account.id, params.id, dispatch]);

  console.log("CLASS NAME", singleClass.name);

  return (
    <>
      <Navbar />
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
    </>
  );
};

export default Class;
