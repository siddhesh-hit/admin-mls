import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "../../../images/back.svg";
import { getApiById, putApi } from "../../../services/axiosInterceptors";

const EditContent = () => {
  const [data, setData] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.search.split("=")[1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setData((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  const handleSubmit = async () => {
    await putApi("minister", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Ministry updated Successfully");
          setTimeout(() => {
            navigate(`/ViewMantriMandal?id=${data._id}`);
          }, 1100);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getApiById("minister", id)
        .then((res) => {
          setData(res.data.data);
          setIsToggled(res.data.data.isActive);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const options = {
    ministry_type: ["Chief Minister", "Deputy Chief Minister", "Minister"],
    assembly_number: [12, 13, 14, 15],
    member_name: ["check1", "check2", "check3"],
    designation: ["check1", "check2", "check3"],
    ministry: [1, 2, 3, 4],
  };

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAllMantriMandal" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit MantriMandal</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-9">
              <form className="form-horizontal border_names">
                {data && (
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Ministry Type :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name="ministry_type"
                          value={data?.ministry_type}
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
                        className="col-sm-3 col-form-label"
                      >
                        Edit Assembly Number :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name="assembly_number"
                          value={data?.assembly_number}
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
                        htmlFor="inputEmail3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Member Name :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name="member_name"
                          value={data?.member_name}
                          onChange={handleChange}
                        >
                          <option hidden>Select Member name</option>
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
                        className="col-sm-3 col-form-label"
                      >
                        Edit Designation :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name="designation"
                          value={data?.designation}
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
                        className="col-sm-3 col-form-label"
                      >
                        Edit Ministry :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name="ministry"
                          value={data?.ministry}
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
                )}
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="card-body">
                <div className="form-group row">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-4 col-form-label"
                  >
                    Edit Status :
                  </label>
                  <div className="col-sm-8">
                    <div
                      className={`toggle-button ${isToggled ? "active" : ""}`}
                      onClick={handleToggle}
                    >
                      <div className={`slider ${isToggled ? "active" : ""}`} />
                      <div className="button-text">
                        {isToggled ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="submit123 mt-5" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
