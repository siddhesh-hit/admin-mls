import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import add from "../../../images/add.svg";

import { getApi, deleteApi } from "../../../services/axiosInterceptors";
import { API } from "../../../config/api";

const ViewContent = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi("gallery")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?") === true) {
      console.log("cehck");
      await deleteApi("gallery", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the gallery.");
            setTimeout(() => {
              navigate("/ViewGallery");
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the gallery.");
        });
    }
  };

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddGallery" className="addpagess">
          <img src={add} alt="add" />
          Add Gallery
        </Link>

        <h4 className="page-title">• View Gallery</h4>
        <div className="card card-info mt-5">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Photos and Videos Gallery</th>
                    <th>View File</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <h4>{index + 1}</h4>
                        </td>
                        <td>
                          <h4>Maharashtra Legislative Secretariat</h4>
                        </td>
                        <td>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>View the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <a
                              href={
                                API.baseUrl +
                                item.destination +
                                "/" +
                                item.filename
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </a>
                          </OverlayTrigger>
                        </td>
                        <td>
                          <Link to={`/EditGallery?id=${item._id}`}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>Edit the data.</Tooltip>
                              )}
                              placement="bottom"
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
                    ))
                  ) : (
                    <></>
                  )}
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
