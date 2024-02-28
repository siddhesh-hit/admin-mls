import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getApiById, putApi } from "../../../services/axiosInterceptors";
import { toast } from "react-toastify";

const EditUserReset = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  const location = useLocation();
  const id = location.search.split("=")[1];
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const fetchData = async () => {
    await getApiById("user", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    if (password !== passwordInput) {
      alert("Both password should match");
      return;
    }

    data.password = password;

    await putApi("user/resetAdmin", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("User password changed!");
          setTimeout(() => {
            navigate(`/ViewPortalUsers`);
          }, 1110);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Reset password</h4>
        <div className="card card-info">
          <div className="row pt-5 pb-5">
            <div className="col-lg-11">
              <form className="form-horizontal">
                <div className="card-body">
                  <p className="rest_pass">
                    Enter your new password to reset your password
                  </p>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Password :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type={passwordType === "password" ? "password" : "text"}
                        placeholder="Enter the password"
                        name="password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Password Again :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type={passwordType === "password" ? "password" : "text"}
                        placeholder="Enter the password again"
                        name="password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        defaultValue={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="form-control"
                      />
                      <div className="input-group-btn">
                        <span onClick={togglePassword}>
                          {passwordType === "password" ? (
                            <i className="fa fa-eye-slash"></i>
                          ) : (
                            <i className="fa fa-eye"></i>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <button className="submit123" onClick={() => handleSubmit()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserReset;
