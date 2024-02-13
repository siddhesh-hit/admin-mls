import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import add from "../../../images/add.svg";

import { deleteApi, getApi } from "../../../services/axiosInterceptors";

const ViewContent = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi("minister")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?") === true) {
      // console.log("cehck");
      await deleteApi("minister", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the ministry.");
            setTimeout(() => {
              navigate("/ViewMinistry");
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the ministry.");
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddMinistry" className="addpagess">
          <img src={add} alt="add" />
          Add Ministry
        </Link>

        <h4 className="page-title">• View Ministry</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Ministry Name</th>
                    <th>Designation</th>
                    <th>Minister</th>
                    <th>Assembly Number</th>
                    <th>Minister of State</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    <>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{item.ministry}</h4>
                          </td>
                          <td>
                            <h4>{item.designation}</h4>
                          </td>
                          <td>
                            <h4>{item.ministry_type}</h4>
                          </td>
                          <td>
                            <h4>{item.assembly_number}</h4>
                          </td>
                          <td>
                            <h4>{item.member_name}</h4>
                          </td>
                          <td>
                            <Link to={`/EditMinistry?id=${item._id}`}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="top"
                              >
                                <i className="fa fa-edit"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link onClick={() => handleDelete(item._id)}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Delete the data.</Tooltip>
                                )}
                                placement="top"
                              >
                                <i className="fa fa-trash"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="card card-info mt-5">
          <div className="row">
            <div className="col-lg-12">
              <table className="table mb-0 gallery_photo">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Photos and Videos Gallery</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <h4>1</h4>
                    </td>
                    <td>
                      <h4>Maharashtra Legislative Secretariat</h4>
                    </td>
                    <td>
                      <button>View</button>
                    </td>
                    <td>
                      <Link to="/Edit_vidhan_mandal">
                        <i
                          className="fa fa-edit"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>1</h4>
                    </td>
                    <td>
                      <h4>Maharashtra Legislative Secretariat</h4>
                    </td>
                    <td>
                      <button>View</button>
                    </td>
                    <td>
                      <Link to="/Edit_vidhan_mandal">
                        <i
                          className="fa fa-edit"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>1</h4>
                    </td>
                    <td>
                      <h4>Maharashtra Legislative Secretariat</h4>
                    </td>
                    <td>
                      <button>View</button>
                    </td>
                    <td>
                      <Link to="/Edit_vidhan_mandal">
                        <i
                          className="fa fa-edit"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>1</h4>
                    </td>
                    <td>
                      <h4>Maharashtra Legislative Secretariat</h4>
                    </td>
                    <td>
                      <button>View</button>
                    </td>
                    <td>
                      <Link to="/Edit_vidhan_mandal">
                        <i
                          className="fa fa-edit"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ViewContent;
