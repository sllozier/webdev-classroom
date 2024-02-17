import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchAccountData,
  fetchClasses,
  fetchAccounts,
} from "../../../store/reducers/accountSlice";
import Navbar from "../navbar/Navbar";
import ClassCard from "../class/ClassCard";

const Dashboard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  //const accounts = useSelector((state) => state.account.accountList);
  const account = useSelector((state) => state.account.accountData);
  const classes = useSelector((state) => state.account.classList);

  // console.log("CLASS LIST", classList);

  // useEffect(() => {
  //   dispatch(fetchAccountData(params.id));
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchAccounts());
  // }, []);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchAccountData(params.id));
      dispatch(fetchClasses(params.id));
    }
  }, [params.id, dispatch]);

  // console.log("ACCOUNT LIST", accounts);
  console.log("ACCOUNT DATA", account);
  console.log("CLASS LIST", classes);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        {classes.length === 0 ? (
          <div className="dashboard_404">
            No classes found! Join or create one!
          </div>
        ) : (
          <div className="dashboard_classContainer">
            {/* Look back on using a key to display individual data. I can send it using props to my class card or account component. */}
            {classes.map((singleClass) => (
              <ClassCard
                name={singleClass.name}
                subject={singleClass.subject}
                id={singleClass.id}
                style={{ marginRight: 30, marginBottom: 30 }}
                key={singleClass.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
