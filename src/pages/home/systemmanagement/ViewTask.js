import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "../../../images/add.svg";

import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import Footer from "../../../components/common/Footer";
import { getApi } from "../../../services/axiosInterceptors";
import { routes } from "../../../data/RouteStructure";

const ViewTask = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getApi("user/roletask")
        .then((res) => setRoles(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  console.log(routes.length);

  const handleDelete = () => {};

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to="/AddTask">
            <img src={add} alt="add" />
            Add Task Management
          </Link>
          <h4 className="page-title">• View All Task Management</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>User</th>
                      <th>Task Name</th>
                      <th>Activity</th>
                      <th>Task Approval Authority</th>
                      {/* <th>Delete</th> */}
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles &&
                      roles?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{item.userId.department}</h4>
                          </td>
                          <td>
                            <h4>{item.userId.full_name}</h4>
                          </td>
                          <td>
                            {item?.taskName?.length === routes.length ? (
                              "All"
                            ) : (
                              <ul>
                                {item.taskName.map((item, index, array) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </td>
                          <td>
                            <h4>{item.activity || "-"}</h4>
                          </td>
                          <td>
                            <h4>{item.role || "-"}</h4>
                          </td>
                          {/* <td onClick={handleDelete}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>Delete the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </td> */}
                          <td>
                            <Link to={`/EditTask?id=${item._id}`}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewTask;
