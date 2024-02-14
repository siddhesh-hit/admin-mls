import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import add from "../../../images/add.svg";

import { API } from "../../../config/api";
import { deleteApi, getApi } from "../../../services/axiosInterceptors";

const ViewContent = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi("party")
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
      await deleteApi("party", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the party.");
            setTimeout(() => {
              navigate("/ViewParty");
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the party.");
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
        <Link to="/AddPoliticalParties" className="addpagess">
          <img src={add} alt="add" />
          Add Political Parties
        </Link>

        <h4 className="page-title">• View Political Parties</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Party Full Name</th>
                    <th>Party Full Name (Marathi)</th>
                    <th>Short Name</th>
                    <th>Short Name (Marathi)</th>
                    <th>Party Flag</th>
                    <th>Party Symbol</th>
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
                            <h4>{item.english.party_name}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.party_name}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.short_name}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.short_name}</h4>
                          </td>
                          <td>
                            <Link
                              to={
                                API.baseUrl +
                                item.party_flag.destination +
                                "/" +
                                item.party_flag.filename
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the image.</Tooltip>
                                )}
                                placement="top"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={
                                API.baseUrl +
                                item.party_symbol.destination +
                                "/" +
                                item.party_symbol.filename
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the image.</Tooltip>
                                )}
                                placement="top"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link to={`/EditPoliticalParties?id=${item._id}`}>
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
      </div>
    </div>
  );
};

export default ViewContent;
