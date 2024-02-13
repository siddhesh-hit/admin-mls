import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import remove from "../../../images/remove.svg";
import back from "../../../images/back.svg";
import addwhite from "../../../images/addwhite.svg";

import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [divCount, setDivCount] = useState(1);
  const [data, setData] = useState(
    // [
    {
      assembly_number: "14",
      ministry_type: "",
      member_name: "",
      designation: "",
      ministry: "",
    }
    //   ]
  );

  const navigate = useNavigate();

  const addDiv = () => {
    let newData = {
      marathi: {
        gender: "",
      },
      english: {
        gender: "",
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

  //   const handleChange = (e, index) => {
  //     const { name, value } = e.target;
  //     const [field, subField] = name.split("_");

  //     setData((prev) => [
  //       ...prev.map((item, i) => {
  //         if (i === index) {
  //           return {
  //             ...item,
  //             [field]: {
  //               ...item[field],
  //               [subField]: value,
  //             },
  //           };
  //         }
  //         return item;
  //       }),
  //     ]);
  //   };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await postApi("minister", data)
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
                          name="member_name"
                          onChange={(e) => handleChange(e)}
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
                        *Add Designation :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="designation"
                          onChange={(e) => handleChange(e)}
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
                        *Minister :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="ministry"
                          onChange={(e) => handleChange(e)}
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
                        *Minister of State :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="ministry_type"
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Enter Ministry Name"
                        />
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
