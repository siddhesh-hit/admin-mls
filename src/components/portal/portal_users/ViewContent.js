import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "../../../images/add.svg";

import { getApi } from "../../../services/axiosInterceptors";
import { API } from "../../../config/api";

const ViewContent = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await getApi("user")
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const dateToFromat = (date) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da}-${mo}-${ye}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddPortalUsers" className="addpagess">
          <img src={add} alt="add" />
          Add Portal User
        </Link>
        <h4 className="page-title">• View Portal User</h4>
        <div className="card card-info">
          <div className="row pt-5 pb-5">
            <div className="col-lg-11">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal respon">
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Houses</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Email Id</th>
                    <th>Mobile Number</th>
                    <th>Date Of Birth</th>
                    <th>Gender</th>
                    <th>Profile</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <p>{item.full_name}</p>
                        </td>
                        <td>
                          <p>{item.houses}</p>
                        </td>
                        <td>
                          <p>{item.department}</p>
                        </td>
                        <td>
                          <p>{item.designation}</p>
                        </td>
                        <td>
                          <p>{item.email}</p>
                        </td>
                        <td>
                          <p>{item.phone_number}</p>
                        </td>
                        <td>
                          <p>{dateToFromat(item.date_of_birth)}</p>
                        </td>
                        <td>
                          <p>{item.gender}</p>
                        </td>
                        <td>
                          <a
                            href={
                              API.baseUrl +
                              item.user_image.destination +
                              "/" +
                              item.user_image.filename
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>View the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </a>
                        </td>
                        {/* <td>
                          <Link to={`/EditPortalUsers?id=${item._id}`}>
                            <i
                              className="fa fa-edit"
                              style={{ fontSize: "20px" }}
                            ></i>
                          </Link>
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;
