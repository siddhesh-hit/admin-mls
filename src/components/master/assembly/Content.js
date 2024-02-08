import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi";

import remove from "../../../images/remove.svg";
import addwhite from "../../../images/addwhite.svg";
import back from "../../../images/back.svg";

import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [divCount, setDivCount] = useState(1);
  const [error, setError] = useState([]);
  const [data, setData] = useState([
    {
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
    },
  ]);

  const navigate = useNavigate();

  const validator = (data) => {
    const res = schema.validate(data, {
      abortEarly: false,
    });
    console.log(res);
    if (res.error) {
      const errorData = storeErrorInDynamicArray(res.error);
      setError(errorData);
    } else {
      let empty = [];
      setError(empty);
    }
  };

  function storeErrorInDynamicArray(error) {
    const structuredError = [];

    error.details.forEach((detail) => {
      let currentField = structuredError;
      let currentPath = "";

      detail.path.forEach((pathPart, index) => {
        currentPath += (index > 0 ? "." : "") + pathPart;

        if (!currentField[pathPart]) {
          currentField[pathPart] = {};
        }

        if (index === detail.path.length - 1) {
          currentField[pathPart] = detail.context.label;
        }

        currentField = currentField[pathPart];
      });
    });

    return structuredError;
  }

  const schema = Joi.array().items(
    Joi.object({
      start_date: Joi.string().required().label("Start date is required."),
      end_date: Joi.string().required().label("End date is required."),
      english: Joi.object({
        assembly_number: Joi.string()
          .required()
          .label("English Assembly number is required."),
        assembly_name: Joi.string()
          .required()
          .label("English Assembly name is required."),
      }),
      marathi: Joi.object({
        assembly_number: Joi.string()
          .required()
          .label("Marathi Assembly number is required."),
        assembly_name: Joi.string()
          .required()
          .label("Marathi Assembly name is required."),
      }),
    })
  );

  const addDiv = () => {
    let newData = {
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
    };
    setData([...data, newData]);
    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDiv = (index) => {
    let newData = [...data];

    newData.splice(index, 1);
    setData(newData);

    if (divCount > 1) {
      setDivCount(divCount - 1);
    }
    alert("You've removed one field");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subField, index] = name.split(".");

    // console.log(name, value, field, subField, index);

    if (index) {
      setData((prev) => [
        ...prev.map((item, i) => {
          if (i === +index) {
            return {
              ...item,
              [field]: {
                ...item[field],
                [subField]: value,
              },
            };
          }
          return item;
        }),
      ]);
    } else {
      console.log("check");
      setData((prev) => [
        ...prev.map((item, i) => {
          if (i === +subField) {
            return {
              ...item,
              [field]: value,
            };
          }
          return item;
        }),
      ]);
    }
  };

  const handleSubmit = async () => {
    // validator(data);

    // error.length > 0
    //   ? toast.error("Fill the fields properly.")
    // :
    await postApi("assembly", data)
      .then(() => {
        toast.success("New Assembly Added.");
        setTimeout(() => {
          navigate("/ViewAssembly");
        }, 1100);
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
                  {[...Array(divCount)].map((_, index) => (
                    <div className="formada border_names" key={index}>
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
                            name={`english.assembly_number.${index}`}
                            onChange={handleChange}
                            className={`form-control mb-3 ${
                              error[index] &&
                              error[index].english &&
                              error[index].english.assembly_number
                                ? "activeError"
                                : ""
                            }`}
                            placeholder="Enter Assembly Number"
                          />

                          {error[index] &&
                          error[index].english &&
                          error[index].english.assembly_number ? (
                            <p className="red-error">
                              {error[index].english.assembly_number}
                            </p>
                          ) : (
                            <></>
                          )}
                          <input
                            type="number"
                            name={`marathi.assembly_number.${index}`}
                            onChange={handleChange}
                            className={`form-control mb-3 ${
                              error[index] &&
                              error[index].marathi &&
                              error[index].marathi.assembly_number
                                ? "activeError"
                                : ""
                            }`}
                            placeholder="विधानसभा क्रमांक प्रविष्ट करा"
                          />
                          {error[index] &&
                          error[index].marathi &&
                          error[index].marathi.assembly_number ? (
                            <p className="red-error">
                              {error[index].marathi.assembly_number}
                            </p>
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
                            name={`english.assembly_name.${index}`}
                            onChange={handleChange}
                            style={{ height: "auto !important" }}
                            className={`form-control mb-3 ${
                              error[index] &&
                              error[index].english &&
                              error[index].english.assembly_name
                                ? "activeError"
                                : ""
                            }`}
                            placeholder="Enter Assembly"
                          />
                          {error[index] &&
                          error[index].english &&
                          error[index].english.assembly_name ? (
                            <p className="red-error">
                              {error[index].english.assembly_name}
                            </p>
                          ) : (
                            <></>
                          )}
                          <textarea
                            type="text"
                            name={`marathi.assembly_name.${index}`}
                            onChange={handleChange}
                            style={{ height: "auto !important" }}
                            className={`form-control ${
                              error[index] &&
                              error[index].marathi &&
                              error[index].marathi.assembly_name
                                ? "activeError"
                                : ""
                            }`}
                            placeholder="विधानसभा नाव प्रविष्ट करा"
                          />
                          {error[index] &&
                          error[index].marathi &&
                          error[index].marathi.assembly_name ? (
                            <p className="red-error">
                              {error[index].marathi.assembly_name}
                            </p>
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
                            name={`start_date.${index}`}
                            onChange={handleChange}
                            className={`form-control mb-3 ${
                              error[index] && error[index].start_date
                                ? "activeError"
                                : ""
                            }`}
                            placeholder="Select Start Date"
                          />
                          {error[index] && error[index].start_date ? (
                            <p className="red-error">
                              {error[index].start_date}
                            </p>
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
                            name={`end_date.${index}`}
                            onChange={handleChange}
                            min={
                              data[index].start_date
                                ? data[index].start_date
                                : ""
                            }
                            className={`form-control mb-3 ${
                              error[index] && error[index].end_date
                                ? "activeError"
                                : ""
                            }`}
                            placeholder="Select End Date"
                          />
                          {error[index] && error[index].end_date ? (
                            <p className="red-error">{error[index].end_date}</p>
                          ) : (
                            <></>
                          )}
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
                            name={`current_assembly.${index}`}
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
                      {index === 0 && (
                        <div onClick={() => addDiv()} className="addSubButton">
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
                    </div>
                  ))}
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
