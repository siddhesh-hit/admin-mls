import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

import back from "../../../images/back.svg";

import { getApi, postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [minister, setMinister] = useState({
    ministry_type: "",
    assembly_number: "",
    member_name: "",
    designation: [],
    year: "",
  });

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMinister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    minister.designation = minister.designation.map((item) => item.value);
    console.log(minister.designation);
    await postApi("minister", minister)
      .then((res) => {
        if (res.data.success) {
          toast.success("Minister is created successfully.");
          navigate("/ViewAllMantriMandal");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
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
                  <form onSubmit={handleSubmit} className="form-horizontal">
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
                          className="col-sm-4 col-form-label"
                        >
                          Designation :
                        </label>
                        <div className="col-sm-8">
                          <Select
                            isMulti
                            name="designation"
                            options={desOpt}
                            onChange={(e) =>
                              setMinister((prev) => ({
                                ...prev,
                                designation: e,
                              }))
                            }
                            className=""
                            classNamePrefix="select"
                            placeholder="Select Designation"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Year :
                        </label>
                        <div className="col-sm-8">
                          <input
                            className="form-control"
                            name="year"
                            type="date"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="submit123 mt-5">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
