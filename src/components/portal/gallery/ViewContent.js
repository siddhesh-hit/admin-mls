import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import add from "../../../images/add.svg";

import {
  getApi,
  postApi,
  deleteApi,
} from "../../../services/axiosInterceptors";
import { API } from "../../../config/api";

const ViewContent = () => {
  const [data, setData] = useState([]);

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

  const handleArchiveSubmit = async (data) => {
    let newData = {
      data_object: data,
      action: "Archive",
      state: "Archived",
      modelName: "MandalGallery",
      modelId: data._id,
    };

    await postApi(`/archive`, newData)
      .then((res) => {
        if (res.data.success) {
          toast.success("An entry archived!");
          fetchData();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?") === true) {
      await deleteApi("gallery", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Delete request forwaded!");
            fetchData();
          }
        })
        .catch((err) => toast.error("Failed to delete the gallery."));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                    <th>Archive</th>
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
                          <Link to={`/ViewGalleryImage?id=${item._id}`}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>View the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              {/* <a
                              href={
                                API.baseUrl +
                                item.destination +
                                "/" +
                                item.filename
                              }
                              target="_blank"
                              rel="noreferrer"
                            > */}
                              <i className="fa fa-eye" aria-hidden="true"></i>
                              {/* </a> */}
                            </OverlayTrigger>
                          </Link>
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
                        <td>
                          <button onClick={() => handleArchiveSubmit(item)}>
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>Archive the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i class="fa fa-archive" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </button>
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
