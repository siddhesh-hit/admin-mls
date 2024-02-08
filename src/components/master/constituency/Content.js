import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import remove from "../../../images/remove.svg";
import addwhite from "../../../images/addwhite.svg";
import back from "../../../images/back.svg";

import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [divCount, setDivCount] = useState(1);
  const [data, setData] = useState([
    {
      marathi: {
        constituency_assembly: "",
        assembly_number: "",
      },
      english: {
        constituency_assembly: "",
        assembly_number: "",
      },
    },
  ]);

  const navigate = useNavigate();

  const addDiv = () => {
    let newData = {
      marathi: {
        constituency_assembly: "",
        assembly_number: "",
      },
      english: {
        constituency_assembly: "",
        assembly_number: "",
      },
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
  };

  const handleSubmit = async () => {
    await postApi("constituency", data)
      .then(() => {
        toast.success("New Constituency Added.");
        setTimeout(() => {
          navigate("/ViewConstituency");
        }, 1100);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <form className="form-horizontal">
                <div className="card-body">
                  {[...Array(divCount)].map((_, index) => (
                    <div className="formada border_names" key={index}>
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
                            name={`english.constituency_assembly.${index}`}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Constitution Name"
                          />
                          <input
                            type="text"
                            name={`marathi.constituency_assembly.${index}`}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="संविधानाचे नाव प्रविष्ट करा"
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
                            name={`english.assembly_number.${index}`}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Assembly Number"
                          />
                          <input
                            type="number"
                            name={`marathi.assembly_number.${index}`}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="विधानसभा क्रमांक प्रविष्ट करा"
                          />
                        </div>
                      </div>

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
