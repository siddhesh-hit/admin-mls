import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "../../../images/back.svg";

import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [data, setData] = useState({
    marathi: {
      assembly_number: "",
      assembly_name: "",
    },
    english: {
      assembly_number: "",
      assembly_name: "",
    },
    start_date: "",
    end_date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split(".");
  };

  const handleSubmit = async () => {
    await postApi("pending", data)
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
                          name={`english.assembly_number`}
                          onChange={handleChange}
                          className={`form-control mb-3`}
                          placeholder="Enter Assembly Number"
                        />

                        <input
                          type="text"
                          name={`marathi.assembly_number`}
                          onChange={handleChange}
                          className={`form-control mb-3`}
                          placeholder="विधानसभा क्रमांक प्रविष्ट करा"
                        />
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
                          name={`english.assembly_name`}
                          onChange={handleChange}
                          style={{ height: "auto !important" }}
                          className={`form-control mb-3 `}
                          placeholder="Enter Assembly"
                        />

                        <textarea
                          type="text"
                          name={`marathi.assembly_name`}
                          onChange={handleChange}
                          style={{ height: "auto !important" }}
                          className={`form-control`}
                          placeholder="विधानसभा नाव प्रविष्ट करा"
                        />
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
                          className={`form-control mb-3`}
                          placeholder="Select Start Date"
                        />
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
                          className={`form-control mb-3`}
                          placeholder="Select End Date"
                        />
                      </div>
                    </div>
                    {/* <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Add Current Assembly :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className={`form-control ${
                              error[index] && error[index].current_assembly
                                ? "activeError"
                                : ""
                            }`}
                            name={`current_assembly`}
                            onChange={handleChange}
                          >
                            <option hidden>Select Current Assembly</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                          {error[index] && error[index].current_assembly ? (
                            <p className="red-error">
                              {error[index].current_assembly}
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div> */}
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
