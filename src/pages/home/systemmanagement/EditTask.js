import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import Footer from "../../../components/common/Footer";

import add from "../../../images/back.svg";
import { getApiById, putApi } from "../../../services/axiosInterceptors";
import { routes, auth } from "../../../data/RouteStructure";
import { toast } from "react-toastify";

const EditTask = () => {
  const [role, setRole] = useState({});
  const options = routes.map((item) => {
    let data = {
      value: item,
      label: item,
    };
    return data;
  });

  const defaultOptions = role?.taskName?.map((item) => {
    let data = {
      value: item,
      label: item,
    };
    return data;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.search.split("=")[1];

  useEffect(() => {
    const fetchData = async () => {
      await getApiById("user/roletask", id)
        .then((res) => {
          if (res.data.success) {
            setRole(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    await putApi("user/roletask", id, role)
      .then((res) => {
        if (res.data.success) {
          toast.success("Roles updated successfully");
          navigate(`/ViewTask`);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;

      setRole((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const val = e.map((item) => item.value);
      setRole((prev) => ({
        ...prev,
        taskName: val,
      }));
    }
  };

  console.log(defaultOptions);

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to={"/ViewTask"}>
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </Link>
          <h4 className="page-title">• Edit Task Management</h4>
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
                          Edit Select Department :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="department"
                            onChange={handleChange}
                            value={role?.userId?.department}
                          >
                            <option hidden>Select Department</option>
                            <option value={"check"}>check</option>
                            <option>Department 2</option>
                            <option>Department 3</option>
                            <option>Department 4</option>
                            <option>Department 5</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Select User :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="userId"
                            value={role?.userId?._id}
                          >
                            <option hidden>Select User</option>
                            <option value={role?.userId?._id}>
                              {role?.userId?.full_name}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          name="taskName"
                          onChange={handleChange}
                          className="col-sm-4 col-form-label"
                        >
                          Edit Task Name :
                        </label>
                        <div className="col-sm-8">
                          <Select
                            isMulti
                            name="colors"
                            options={options}
                            onChange={handleChange}
                            value={defaultOptions}
                            closeMenuOnSelect={false}
                            classNamePrefix="select"
                            placeholder="Select CMS Pages"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Activity :
                        </label>
                        <div className="col-sm-8">
                          <textarea
                            placeholder="Enter Description"
                            className="form-control"
                            rows="3"
                            name="activity"
                            onChange={handleChange}
                            defaultValue={role?.activity}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputEmail3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Task Approval Authority :
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="role"
                            onChange={handleChange}
                            value={role?.role}
                          >
                            <option hidden>
                              Select Task Approval Authority
                            </option>
                            {auth.map((item, index) => (
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
      <Footer />
    </div>
  );
};

export default EditTask;
