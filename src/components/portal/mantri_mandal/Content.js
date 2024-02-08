import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "../../../images/back.svg";
import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [minister, setMinister] = useState({
    ministry_type: "",
    assembly_number: "",
    member_name: "",
    designation: "",
    ministry: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMinister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await postApi("minister", minister)
      .then((res) => {
        if (res.data.success) {
          toast.success("Minister is created successfully.");
          navigate("/ViewMantriMandal");
        }
      })
      .catch((err) => console.log(err));
  };

  const options = {
    ministry_type: ["Chief Minister", "Deputy Chief Minister", "Minister"],
    assembly_number: [12, 13, 14, 15],
    member_name: ["check1", "check2", "check3"],
    designation: ["check1", "check2", "check3"],
    ministry: [1, 2, 3, 4],
  };

  console.log(minister);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to="/ViewAllMantriMandal" className="addpagess">
            <img src={back} style={{ width: "25px" }} alt="add" />
            Go back
          </Link>
          <h4 className="page-title">• Add Mantrimandal</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal">
                    <div className="card-body border_names">
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Ministry Type :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="ministry_type"
                            value={minister.ministry_type}
                            onChange={handleChange}
                          >
                            <option hidden>Select Ministry Type</option>
                            {options.ministry_type.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Assembly Number :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="assembly_number"
                            value={minister.assembly_number}
                            onChange={handleChange}
                          >
                            <option hidden>Select Assembly Number</option>
                            {options.assembly_number.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Member Name :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="member_name"
                            value={minister.member_name}
                            onChange={handleChange}
                          >
                            <option hidden>Select Member Name</option>
                            {options.member_name.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Designation :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="designation"
                            value={minister.designation}
                            onChange={handleChange}
                          >
                            <option hidden>Select Designation</option>
                            {options.designation.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Ministry :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="ministry"
                            value={minister.ministry}
                            onChange={handleChange}
                          >
                            <option hidden>Select Ministry</option>
                            {options.ministry.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button className="submit123 mt-5" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
