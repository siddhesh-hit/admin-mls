import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Paginate from "../../../components/common/Paginate";
import TotalEntries from "../../../table/TotalEntries";
import add from "../../../images/add.svg";

import { getApi } from "../../../services/axiosInterceptors";
import { API } from "../../../config/api";

const ViewContent = () => {
  const [data, setData] = useState([]);
  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    action: "",
    count: 0,
    full_name: "",
  });

  const fetchData = async () => {
    await getApi(
      `user?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&role_taskId.role=${pageOptions.action}&full_name=${pageOptions.full_name}`
    )
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setPageOptions((prev) => ({
            ...prev,
            count: res.data.count,
          }));
        }
      })
      .catch((err) => console.log(err));
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
  }, [
    pageOptions.action,
    pageOptions.page,
    pageOptions.current,
    pageOptions.full_name,
  ]);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddPortalUsers" className="addpagess">
          <img src={add} alt="add" />
          Add Portal User
        </Link>
        <h4 className="page-title">• View Portal User</h4>

        <select
          className="form-control mb-4"
          name="action"
          value={pageOptions.action}
          onChange={(e) =>
            setPageOptions((prev) => ({
              ...prev,
              action: e.target.value,
            }))
          }
        >
          <option hidden>Select Action</option>
          <option value={"SuperAdmin"}>SuperAdmin</option>
          <option value={"Admin"}>Admin</option>
          <option value={"Reviewer"}>Reviewer</option>
          <option value={"ContentCreator"}>ContentCreator</option>
          <option value={"User"}>User</option>
        </select>

        <TotalEntries
          returnCount={(data) =>
            setPageOptions((prev) => ({
              ...prev,
              page: data,
            }))
          }
          returnSearch={(data) =>
            setPageOptions((prev) => ({
              ...prev,
              full_name: data,
            }))
          }
        />

        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
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
                    <th>Action</th>
                    <th>Block</th>
                    <th>Reset</th>
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
                          {item.user_image ? (
                            <a
                              href={
                                API.baseUrl +
                                item.user_image?.destination +
                                "/" +
                                item.user_image?.filename
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View profile.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </a>
                          ) : (
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>
                                  No profile to view.
                                </Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i class="fa fa-eye-slash" aria-hidden="true"></i>
                            </OverlayTrigger>
                          )}
                        </td>
                        <td>
                          <Link to={`/EditPortalUsers?id=${item._id}`}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>
                                  Edit the user profile.
                                </Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i
                                className="fa fa-edit"
                                style={{ fontSize: "20px" }}
                              ></i>
                            </OverlayTrigger>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/BlockUser?id=${item._id}`}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>
                                  Block/Unblock User.
                                </Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i class="fa-solid fa-unlock"></i>
                            </OverlayTrigger>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/UserReset?id=${item._id}`}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>Reset password.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i class="fa-solid fa-key"></i>
                            </OverlayTrigger>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {pageOptions.count > 0 && (
                <Paginate
                  totalCount={pageOptions.count}
                  perPage={pageOptions.page}
                  handlePageChange={(currentPage) => {
                    setPageOptions((prev) => ({
                      ...prev,
                      current: currentPage,
                    }));
                  }}
                  initialPage={pageOptions.current}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;
