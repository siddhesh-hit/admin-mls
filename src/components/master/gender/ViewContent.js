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
    await getApi("gender")
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
      await deleteApi("gender", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the gender.");
            setTimeout(() => {
              navigate("/ViewGender");
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the gender.");
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
        <Link to="/AddGender" className="addpagess">
          <img src={add} alt="add" />
          Add Gender
        </Link>

        <h4 className="page-title">• View Gender</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th>Gender (Marathi)</th>
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
                            <h4>{item.english.gender}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.gender}</h4>
                          </td>
                          <td>
                            <Link to={`/EditGender?id=${item._id}`}>
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
