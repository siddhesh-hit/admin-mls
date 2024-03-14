import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "../../../images/back.svg";

import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [error, setError] = useState({});
  const [data, setData] = useState({
    assembly_number: "",
    assembly_name: "",
    start_date: "",
    end_date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (event) => {
    // Allow backspace and delete keys
    if (event.key === "Backspace" || event.key === "Delete") {
      return;
    }

    // Allow digits (0-9) and a single hyphen (-)
    const currentValue = event.target.value;
    const key = event.key;
    const allowedCharacters = /^[0-9-]$/;

    if (
      (key === "-" && currentValue.includes("-")) || // Allow only one hyphen
      !allowedCharacters.test(key)
    ) {
      event.preventDefault();
    }
  };

  const handleSubmit = async () => {
    await postApi("assembly", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("New Assembly Added.");
          setTimeout(() => {
            navigate("/ViewAssembly");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAssembly" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Assembly</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9 ">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="formada border_names">
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Assembly Number :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name={`assembly_number`}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          className={`form-control mb-3 ${
                            error && error.assembly_number ? "activeError" : ""
                          }`}
                          placeholder="Enter Assembly Number"
                        />

                        {error && error.assembly_number ? (
                          <p className="red-error">{error.assembly_number}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Assembly Name :
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          type="text"
                          name={`assembly_name`}
                          onChange={handleChange}
                          style={{ height: "auto !important" }}
                          className={`form-control mb-3 ${
                            error && error.assembly_name ? "activeError" : ""
                          }`}
                          placeholder="Enter Assembly"
                        />
                        {error && error.assembly_name ? (
                          <p className="red-error">{error.assembly_name}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add Start Date :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="date"
                          name={`start_date`}
                          onChange={handleChange}
                          className={`form-control mb-3 ${
                            error && error.start_date ? "activeError" : ""
                          }`}
                          placeholder="Select Start Date"
                        />
                        {error && error.start_date ? (
                          <p className="red-error">{error.start_date}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        *Add End Date :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="date"
                          name={`end_date`}
                          onChange={handleChange}
                          min={data.start_date ? data.start_date : ""}
                          className={`form-control mb-3 ${
                            error && error.end_date ? "activeError" : ""
                          }`}
                          placeholder="Select End Date"
                        />
                        {error && error.end_date ? (
                          <p className="red-error">{error.end_date}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button className="submit123 mt-4" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
