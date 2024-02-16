import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchAccountData,
  fetchClasses,
} from "../../../store/reducers/accountSlice";
import Navbar from "../navbar/Navbar";

const Dashboard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.accountData);
  const classList = useSelector((state) => state.account.classList);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchAccountData(params.id))
        .then(() => {
          // Assuming fetchAccountData is an async thunk action
          dispatch(fetchClasses(params.id));
        })
        .catch((error) =>
          console.error("Failed to fetch account data:", error)
        );
    }
  }, [dispatch, params.id]);

  console.log("ACCOUNT DATA", account);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        {classList.length === 0 ? (
          <div className="dashboard_404">
            No classes found! Join or create one!
          </div>
        ) : (
          <div className="dashboard_classContainer">
            {classList.map((singleClass) => (
              <>
                <h1>{singleClass.name}</h1>
                <h3>{singleClass.subject}</h3>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
