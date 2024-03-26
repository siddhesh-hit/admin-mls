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

  const [defaultOpt, setdefaultOpt] = useState({
    ministry: [],
    assembly: [],
    member: [],
    designation: [],
    presiding: [],
    legislative_position: [],
  });

  const [options, setOptions] = useState({
    ministry: [],
    assembly: [],
    member: [],
    designation: [],
    presiding: [],
    legislative_position: [],
  });

  const desOpt = options?.designation?.map((item) => {
    let data = {
      value: item._id,
      label: item.name,
    };
    return data;
  });
  const presOpt = options?.presiding?.map((item) => {
    let data = {
      value: item._id,
      label: item.name,
    };
    return data;
  });
  const lpOpt = options?.legislative_position?.map((item) => {
    let data = {
      value: item._id,
      label: item.name,
    };
    return data;
  });
  const minisOpt = options?.ministry?.map((item) => {
    let data = {
      value: item._id,
      label: item.ministry_name,
    };
    return data;
  });

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
    data.designation = data.designation.map((item) => item.value || item._id);
    data.presiding = data.presiding.map((item) => item.value || item._id);
    data.legislative_position = data.legislative_position.map(
      (item) => item.value || item._id
    );
    data.ministry_type = data.ministry_type.map(
      (item) => item.value || item._id
    );

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
          setdefaultOpt((prev) => ({
            ...prev,
            ministry: res?.data?.data.ministry_type?.map((item) => {
              let data = {
                value: item._id,
                label: item.ministry_name,
              };
              return data;
            }),
            designation: res?.data?.data?.designation?.map((item) => {
              let data = {
                value: item._id,
                label: item.name,
              };
              return data;
            }),
            presiding: res?.data?.data?.presiding?.map((item) => {
              let data = {
                value: item._id,
                label: item.name,
              };
              return data;
            }),
            legislative_position: res?.data?.data?.legislative_position?.map(
              (item) => {
                let data = {
                  value: item._id,
                  label: item.name,
                };
                return data;
              }
            ),
          }));
          setIsToggled(res.data.data.isActive);
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("ministry/option")
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

      await getApi("assembly/option")
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

      await getApi("designation/option")
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

      await getApi("officer/option")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              presiding: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi("position/option")
        .then((res) => {
          if (res.data.success) {
            setOptions((prevData) => ({
              ...prevData,
              legislative_position: res.data.data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getApi(
        `member/all?status=Approved&basic_info.house=Assembly&basic_info.assembly_number=${
          data?.assembly_number?._id || ""
        }`
      )
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
    };
    fetchData();
  }, [data?.assembly_number]);

  console.log(data);

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
              {data && (
                <form onSubmit={handleSubmit} className="form-horizontal">
                  <div className="card-body border_names">
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
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Member Name :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name="member_name"
                          value={data?.member_name?._id}
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
                        Ministry Type :
                      </label>
                      <div className="col-sm-8">
                        <Select
                          isMulti
                          name="ministry_type"
                          value={defaultOpt.ministry}
                          options={minisOpt}
                          onChange={(e) => {
                            setData((prev) => ({
                              ...prev,
                              ministry_type: e,
                            }));
                            setdefaultOpt((prev) => ({
                              ...prev,
                              ministry: e,
                            }));
                          }}
                          className=""
                          classNamePrefix="select"
                          placeholder="Select Ministry Type"
                        />
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
                          value={defaultOpt.designation}
                          options={desOpt}
                          onChange={(e) => {
                            setData((prev) => ({
                              ...prev,
                              designation: e,
                            }));
                            setdefaultOpt((prev) => ({
                              ...prev,
                              designation: e,
                            }));
                          }}
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
                        Designation Year :
                      </label>
                      <div className="col-sm-4">
                        <input
                          className="form-control"
                          name="des_from"
                          type="date"
                          value={data?.des_from?.split("T")[0]}
                          min={"1937-01-01"}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-4">
                        <input
                          className="form-control"
                          name="des_to"
                          type="date"
                          value={data?.des_to?.split("T")[0]}
                          min={data?.des_from ? data?.des_from : "1937-01-01"}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Presiding Officer :
                      </label>
                      <div className="col-sm-8">
                        <Select
                          isMulti
                          name="presiding"
                          value={defaultOpt.presiding}
                          options={presOpt}
                          onChange={(e) => {
                            setData((prev) => ({
                              ...prev,
                              presiding: e,
                            }));
                            setdefaultOpt((prev) => ({
                              ...prev,
                              presiding: e,
                            }));
                          }}
                          className=""
                          classNamePrefix="select"
                          placeholder="Select Presiding Officer"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Presiding Officer Year :
                      </label>
                      <div className="col-sm-4">
                        <input
                          className="form-control"
                          name="pres_from"
                          type="date"
                          value={data?.pres_from?.split("T")[0]}
                          min={"1937-01-01"}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-4">
                        <input
                          className="form-control"
                          name="pres_to"
                          type="date"
                          value={data?.pres_to?.split("T")[0]}
                          min={data?.pres_from ? data?.pres_from : "1937-01-01"}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Legislative Position :
                      </label>
                      <div className="col-sm-8">
                        <Select
                          isMulti
                          name="legislative_position"
                          options={lpOpt}
                          value={defaultOpt.legislative_position}
                          onChange={(e) => {
                            setData((prev) => ({
                              ...prev,
                              legislative_position: e,
                            }));
                            setdefaultOpt((prev) => ({
                              ...prev,
                              legislative_position: e,
                            }));
                          }}
                          className=""
                          classNamePrefix="select"
                          placeholder="Select Legilsative Position"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        legislative Position Year :
                      </label>
                      <div className="col-sm-4">
                        <input
                          className="form-control"
                          name="lp_from"
                          type="date"
                          value={data?.lp_from?.split("T")[0]}
                          min={"1937-01-01"}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-4">
                        <input
                          className="form-control"
                          name="lp_to"
                          type="date"
                          value={data?.lp_to?.split("T")[0]}
                          min={data?.lp_from ? data?.lp_from : "1937-01-01"}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="submit123 mt-5">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
