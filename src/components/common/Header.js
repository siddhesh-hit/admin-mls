import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { decrypt } from "../../config/encrypt";
import { postApi } from "../../services/axiosInterceptors";
import { logout } from "../../redux/authSlice";
import { API } from "../../config/api";

export default function Header() {
  const [userProfile, setUserProfile] = useState({});

  const state = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await postApi("user/logout", {})
      .then(() => {
        dispatch(logout());
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (state) {
      let deData = JSON.parse(decrypt(state.user));
      setUserProfile(deData);
    }
  }, [state]);

  // console.log(userProfile);

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="##"
            role="button"
          >
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <div
            className="nav-link"
            data-toggle="dropdown"
            style={{ paddingTop: "3px" }}
          >
            <div className="user-panel pb-3 mb-3 d-flex align-content-center">
              <div className="image">
                <img
                  src={
                    API.baseUrl +
                    userProfile?.user_image?.destination +
                    "/" +
                    userProfile?.user_image?.filename
                  }
                  className="elevation-2"
                  alt="User"
                  style={{ height: "auto", width: "2.1rem" }}
                />
              </div>
              <div className="info">
                <div
                  href="#"
                  className="d-block"
                  style={{ color: "rgb(92 92 92)" }}
                >
                  {userProfile?.full_name}{" "}
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div
              to="/Login"
              onClick={() => handleLogout()}
              className="dropdown-item"
            >
              <i className="fa fa-sign-out" aria-hidden="true" />
              Logout
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
