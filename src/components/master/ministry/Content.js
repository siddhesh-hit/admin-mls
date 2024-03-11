import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import remove from "../../../images/remove.svg";
import back from "../../../images/back.svg";
import addwhite from "../../../images/addwhite.svg";

import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [divCount, setDivCount] = useState(1);
  const [data, setData] = useState({
    ministry_name: "",
    minister: "",
    year: "",
    sub_ministry: [
      {
        name: "",
        minister: "",
      },
    ],
  });

  const navigate = useNavigate();

  const addDiv = () => {
    let newData = {
      name: "",
      minister: "",
    };

    setData((prev) => ({
      ...prev,
      sub_ministry: [...prev.sub_ministry, newData],
    }));
    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDiv = (index) => {
    let newData = [...data.sub_ministry];

    newData.splice(index, 1);
    setData((prev) => ({
      ...prev,
      sub_ministry: newData,
    }));

    if (divCount > 1) {
      setDivCount(divCount - 1);
    }
    alert("You've removed one field");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, index, subField] = name.split(".");

    if (index) {
      setData((prev) => ({
        ...prev,
        [field]: [
          ...prev[field].map((item, ind) => {
            return ind === +index
              ? {
                  ...item,
                  [subField]: value,
                }
              : item;
          }),
        ],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    await postApi("ministry", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Added ministry");
          setTimeout(() => {
            navigate("/ViewMinistry");
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
        <Link to="/ViewMinistry" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Ministry</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-10">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="formada border_names">
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        *Add Ministry Name :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="ministry_name"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter Ministry Name"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        *Add Minister :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="minister"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter Minister"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        *Add Year :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="year"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter Year"
                        />
                      </div>
                    </div>
                    {[...Array(divCount)].map((_, index) => (
                      <React.Fragment key={index}>
                        <div className="form-group row mb-2">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-4 col-form-label"
                          >
                            *Add Sub Ministry {index + 1}:
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              name={`sub_ministry.${index}.name`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="Enter Sub Ministry name"
                            />
                            <input
                              type="text"
                              name={`sub_ministry.${index}.minister`}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="Enter Sub Ministry minister"
                            />
                          </div>
                        </div>
                        {index === 0 && (
                          <div
                            onClick={() => addDiv()}
                            className="addSubButton"
                          >
                            <img src={addwhite} alt="white" />
                          </div>
                        )}
                        {index !== 0 && (
                          <div
                            onClick={() => removeDiv(index)}
                            className="addSubButton"
                          >
                            <img
                              src={remove}
                              alt="remove"
                              style={{ height: "25px", width: "25px" }}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
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
