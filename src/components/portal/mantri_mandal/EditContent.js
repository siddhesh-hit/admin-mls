import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

import back from "../../../images/back.svg";

import {
  getApi,
  getApiById,
  putApi,
} from "../../../services/axiosInterceptors";

const EditContent = () => {
  const [data, setData] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

  const [options, setOptions] = useState({
    ministry: [],
    assembly: [],
    member: [],
    designation: [],
  });

  const desOpt = options?.designation?.map((item) => {
    let data = {
      value: item._id,
      label: item.name,
    };
    return data;
  });

  const [defaultDesOpt, setDefaultDesOpt] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.designation = defaultDesOpt.map((item) => item.value);
    data.assembly_number = data.assembly_number._id;
    data.member_name = data.member_name._id;
    data.ministry_type = data.ministry_type._id;

    console.log(data);

    await putApi("minister", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Ministry updated request forwaded!");
          setTimeout(() => {
            navigate(`/ViewAllMantriMandal`);
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
          setDefaultDesOpt(
            res?.data?.data?.designation?.map((item) => {
              let data = {
                value: item._id,
                label: item.name,
              };
              return data;
            })
          );
          setIsToggled(res.data.data.isActive);
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("ministry")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              ministry: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("assembly")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              assembly: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("member?status=Approved")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              member: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("designation")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              designation: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

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
              <form
                onSubmit={handleSubmit}
                className="form-horizontal border_names"
              >
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
                          value={data?.ministry_type?._id}
                          onChange={handleChange}
                        >
                          <option hidden>Select Ministry Type</option>
                          {options.ministry.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.ministry_name}
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
                          value={data?.assembly_number?._id}
                          onChange={handleChange}
                        >
                          <option hidden>Select Assembly Number</option>
                          {options.assembly.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.assembly_number}
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
                          value={data?.member_name?._id}
                          onChange={handleChange}
                        >
                          <option hidden>Select Member name</option>
                          {options.member.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.basic_info.surname +
                                " " +
                                item.basic_info.name}
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
                        <Select
                          isMulti
                          name="designation"
                          options={desOpt}
                          onChange={(e) => setDefaultDesOpt(e)}
                          value={defaultDesOpt}
                          closeMenuOnSelect={false}
                          classNamePrefix="select"
                          placeholder="Select Designation"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Year :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="date"
                          defaultValue={data?.year}
                          className="form-control"
                          name="year"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Edit Status :
                      </label>
                      <div className="col-sm-8">
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
                      </div>
                    </div>
                    <button className="submit123 mt-5">Submit</button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
