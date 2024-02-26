import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import back from "../../../images/back.svg";

import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [isToggled, setIsToggled] = useState(true);

  const [state, setState] = useState({
    assembly: true,
    council: false,
  });

  const [data, setData] = useState({
    marathi: {
      assembly: {
        constituency_assembly: "",
        assembly_number: "",
        year: "",
      },
      council: {
        constituency_type: "",
        constituency_name: "",
        year: "",
      },
    },
    english: {
      assembly: {
        constituency_assembly: "",
        assembly_number: "",
        year: "",
      },
      council: {
        constituency_type: "",
        constituency_name: "",
        year: "",
      },
    },
    isHouse: "Assembly",
  });

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setState((prev) => ({
      ...prev,
      assembly: !prev.assembly,
      council: !prev.council,
    }));
    setData((prev) => ({
      ...prev,
      marathi: {
        assembly: {
          constituency_assembly: "",
          assembly_number: "",
          year: "",
        },
        council: {
          constituency_type: "",
          constituency_name: "",
          year: "",
        },
      },
      english: {
        assembly: {
          constituency_assembly: "",
          assembly_number: "",
          year: "",
        },
        council: {
          constituency_type: "",
          constituency_name: "",
          year: "",
        },
      },
      isHouse: !state.assembly ? "Assembly" : "Constituency",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [lang, field, subField] = name.split(".");

    console.log(lang, field, subField);

    setData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: {
          ...prev[lang][field],
          [subField]: value,
        },
      },
    }));
  };

  const handleDateChange = (e, name) => {
    if (name === "assembly") {
      setData((prev) => ({
        ...prev,
        english: {
          ...prev.english,
          assembly: {
            ...prev.english.assembly,
            year: e,
          },
        },
        marathi: {
          ...prev.marathi,
          assembly: {
            ...prev.marathi.assembly,
            year: e,
          },
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        english: {
          ...prev.english,
          council: {
            ...prev.english.council,
            year: e,
          },
        },
        marathi: {
          ...prev.marathi,
          council: {
            ...prev.marathi.council,
            year: e,
          },
        },
      }));
    }
  };

  const handleSubmit = async () => {
    await postApi("constituency", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("New Constituency Added.");
          setTimeout(() => {
            navigate("/ViewConstituency");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewConstituency" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Constituency</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <div className="card-body">
                <div className="form-group row">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-4 col-form-label"
                  >
                    Select constituency type :
                  </label>
                  <div className="col-sm-8">
                    <div
                      className={`toggle-button ${isToggled ? "active" : ""}`}
                      onClick={handleToggle}
                    >
                      <div className={`slider ${isToggled ? "active" : ""}`} />
                      <div className="button-text">
                        {isToggled ? "Assembly" : "Constituency"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="formada border_names">
                    {state.assembly && (
                      <>
                        <div className="form-group row mb-5">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Constituency Name :
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              name={`english.assembly.constituency_assembly`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="Enter Constitution Name"
                            />
                            <input
                              type="text"
                              name={`marathi.assembly.constituency_assembly`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="मतदारसंघाचे नाव प्रविष्ट करा"
                            />
                          </div>
                        </div>
                        <div className="form-group row mb-5">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Assembly Number :
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="number"
                              name={`english.assembly.assembly_number`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="Enter Assembly Number"
                            />
                            <input
                              type="number"
                              name={`marathi.assembly.assembly_number`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="विधानसभा क्रमांक प्रविष्ट करा"
                            />
                          </div>
                        </div>
                        <div className="form-group row mb-5">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Year :
                          </label>
                          <div className="col-sm-9">
                            <DatePicker
                              placeholderText="Select year"
                              selected={data.english.assembly.year}
                              showYearPicker
                              dateFormat={"yyyy"}
                              onChange={(e) => handleDateChange(e, "assembly")}
                              className="form-control"
                              minDate={new Date("02-01-1936")}
                              maxDate={new Date()}
                              name="english.assembly.year"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {state.council && (
                      <>
                        <div className="form-group row mb-5">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Constituency type :
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              name={`english.council.constituency_type`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="Enter Constitution type"
                            />
                            <input
                              type="text"
                              name={`marathi.council.constituency_type`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="मतदारसंघाचा प्रकार प्रविष्ट करा"
                            />
                          </div>
                        </div>
                        <div className="form-group row mb-5">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Constituency name :
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="number"
                              name={`english.council.constituency_name`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="Enter Constituency name"
                            />
                            <input
                              type="number"
                              name={`marathi.council.constituency_name`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="मतदारसंघाचे नाव टाका"
                            />
                          </div>
                        </div>
                        <div className="form-group row mb-5">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            *Add Year :
                          </label>
                          <div className="col-sm-9">
                            <DatePicker
                              placeholderText="Select year"
                              selected={data.english.assembly.year}
                              showYearPicker
                              dateFormat={"yyyy"}
                              onChange={(e) => handleDateChange(e, "council")}
                              className="form-control"
                              minDate={new Date("02-01-1936")}
                              maxDate={new Date()}
                              name="english.council.year"
                            />
                          </div>
                        </div>
                      </>
                    )}
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
