import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import add from "../../../images/add.svg";
import back from "../../../images/back.svg";
import remove from "../../../images/remove.svg";

import { getApiById, putApi } from "../../../services/axiosInterceptors";

const EditContent = () => {
  const [divCount, setDivCount] = useState(1);
  const [isToggled, setIsToggled] = useState(false);

  const [data, setData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("navigation", id)
      .then((res) => {
        setData(res.data.data);
        setIsToggled(res.data.data.isDropDown);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [lang, field, subField, index] = name.split(".");

    // console.log(lang, field, subField, index);

    if (index) {
      setData((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: prev[lang][field].map((item, ind) =>
            ind === +index
              ? {
                  ...item,
                  [subField]: value,
                }
              : item
          ),
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: value,
        },
      }));
    }
  };

  const addDiv = () => {
    let object = {
      name: "",
    };

    setData((prev) => ({
      ...prev,
      english: {
        ...prev.english,
        dropDownValue: [...prev.english.dropDownValue, object],
      },
      marathi: {
        ...prev.marathi,
        dropDownValue: [...prev.marathi.dropDownValue, object],
      },
    }));

    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDiv = (index) => {
    let object1 = [...data.english.dropDownValue];
    let object2 = [...data.marathi.dropDownValue];

    object1.splice(index, 1);
    object2.splice(index, 1);

    setData((prev) => ({
      ...prev,
      english: {
        ...prev.english,
        dropDownValue: object1,
      },
      marathi: {
        ...prev.marathi,
        dropDownValue: object2,
      },
    }));

    if (divCount > 1) {
      setDivCount(divCount - 1);
    }
    alert("You've removed one field");
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);

    console.log(data);

    let object = {
      name: "",
    };

    if (!data.isDropDown) {
      setData((prev) => ({
        ...prev,
        isDropDown: true,
        english: {
          ...prev.english,
          dropDownValue: [...prev.english.dropDownValue, object],
        },
        marathi: {
          ...prev.marathi,
          dropDownValue: [...prev.marathi.dropDownValue, object],
        },
      }));

      console.log("this");
    } else {
      setData((prev) => ({
        ...prev,
        english: {
          ...prev.english,
          dropDownValue: [],
        },
        marathi: {
          ...prev.english,
          dropDownValue: [],
        },
        isDropDown: false,
      }));

      console.log("that");
    }

    console.log(data);
  };

  const handleSubmit = async () => {
    await putApi("navigation", id, data)
      .then(() => {
        toast.success("Added navigation");
        setTimeout(() => {
          navigate("/ViewNavigation");
        }, 1100);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewNavigation" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="back" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Navigation</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              {data && data.english && data.marathi && (
                <form className="form-horizontal border_names">
                  <div className="card-body">
                    <div className="formada">
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Edit Navbar field :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english.navigation"
                            onChange={handleChange}
                            defaultValue={data.english.navigation}
                            className="form-control mb-3"
                            placeholder="Enter Navbar field"
                          />
                          <input
                            type="text"
                            name="marathi.navigation"
                            onChange={handleChange}
                            defaultValue={data.marathi.navigation}
                            className="form-control mb-3"
                            placeholder="नवबार फील्ड प्रविष्ट करा"
                          />
                        </div>
                      </div>

                      <div className="fform-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Edit Sub field :
                        </label>
                        <div className="col-sm-9">
                          <div
                            className={`toggle-button ${
                              isToggled ? "active" : ""
                            }`}
                            onClick={handleToggle}
                          >
                            <div
                              className={`slider ${isToggled ? "active" : ""}`}
                            />
                            <div className="button-text">
                              {isToggled ? "Active" : "Inactive"}
                            </div>
                          </div>
                          <p className="photo_disclaimer mt-3">
                            *Only turn active when you want to add sub fields in
                            the navbar
                          </p>
                        </div>
                      </div>

                      {data.isDropDown ? (
                        <>
                          {data.english.dropDownValue.length > 0 &&
                          data.marathi.dropDownValue.length > 0
                            ? data.english.dropDownValue.map((item, index) => (
                                <div
                                  className="form-group row mb-5"
                                  key={index}
                                >
                                  <label
                                    htmlFor="inputPassword3"
                                    className="col-sm-3 col-form-label"
                                  >
                                    *Edit Sub-Navbar Field :
                                  </label>
                                  <div className="col-sm-9">
                                    <input
                                      type="text"
                                      name={`english.dropDownValue.name.${index}`}
                                      defaultValue={item?.name}
                                      onChange={handleChange}
                                      className="form-control mb-3"
                                      placeholder="Enter Sub-Navbar Field"
                                    />
                                    <input
                                      type="text"
                                      name={`marathi.dropDownValue.name.${index}`}
                                      defaultValue={
                                        data?.marathi?.dropDownValue[index]
                                          ?.name
                                      }
                                      onChange={handleChange}
                                      className="form-control mb-3"
                                      placeholder="सुब-नवबार फील्ड प्रविष्ट करा"
                                    />
                                  </div>

                                  {index === 0 && (
                                    <div
                                      className="addSubButton"
                                      style={{ cursor: "pointer" }}
                                      onClick={addDiv}
                                    >
                                      <img
                                        className="add"
                                        src={add}
                                        alt="add"
                                      />
                                    </div>
                                  )}
                                  {index !== 0 && (
                                    <div
                                      className="addSubButton"
                                      style={{ cursor: "pointer" }}
                                      onClick={removeDiv}
                                    >
                                      <img src={remove} alt="Remove" />
                                    </div>
                                  )}
                                </div>
                              ))
                            : [...Array(divCount)].map((_, index) => (
                                <div
                                  className="form-group row mb-5"
                                  key={index}
                                >
                                  <label
                                    htmlFor="inputPassword3"
                                    className="col-sm-3 col-form-label"
                                  >
                                    *Add Sub-Navbar Field :
                                  </label>
                                  <div className="col-sm-9">
                                    <input
                                      type="text"
                                      name={`english.dropDownValue.name.${index}`}
                                      onChange={handleChange}
                                      className="form-control mb-3"
                                      placeholder="Add Sub-Navbar Field"
                                    />
                                    <input
                                      type="text"
                                      name={`marathi.dropDownValue.name.${index}`}
                                      onChange={handleChange}
                                      className="form-control mb-3"
                                      placeholder="सुब-नवबार फील्ड प्रविष्ट करा"
                                    />
                                  </div>

                                  {index === 0 && (
                                    <div
                                      onClick={addDiv}
                                      className="addSubButton"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <img
                                        className="add"
                                        src={add}
                                        alt="add"
                                      />
                                    </div>
                                  )}
                                  {index !== 0 && (
                                    <div
                                      onClick={() => removeDiv(index)}
                                      className="addSubButton"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <img src={remove} alt="Remove" />
                                    </div>
                                  )}
                                </div>
                              ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </form>
              )}
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

export default EditContent;
