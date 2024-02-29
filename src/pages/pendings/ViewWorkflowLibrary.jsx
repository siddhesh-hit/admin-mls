import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import Header from "../../components/common/Header";
import Menu from "../../components/common/Menu";
import Footer from "../../components/common/Footer";

import { API } from "../../config/api";
import { getApiById, putApi } from "../../services/axiosInterceptors";

const ViewWorkflowLibrary = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const configRoutes = {
    Create: "updatePost",
    Update: "updatePut",
    Delete: "updateDel",
  };

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("&")[0].split("=")[1];
  const action = location?.search?.split("&")[1]?.split("=")[1];

  const fetchData = async () => {
    await getApiById("pending", id)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleChange = (e) => {
    setStatus(e.target.name);
  };

  const handleSubmit = async () => {
    data.status = status;
    await putApi(`pending/${configRoutes[action]}`, id, data)
      .then((res) => {
        if (res.data.success) {
          // toast.success("Updated pending");
          toast.success(`Status ${status}!`);
          setTimeout(() => {
            navigate(`/ViewAllWorkflow`);
          }, 1100);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View Library</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>Image</th>
                      <th className="heighttab" style={{ width: "35%" }}>
                        Description
                      </th>
                      <th className="heighttab" style={{ width: "35%" }}>
                        वर्णन
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data_object?.english &&
                    data?.data_object?.marathi ? (
                      <tr>
                        <td>
                          <a
                            href={
                              API.baseUrl +
                              data?.data_object.banner.destination +
                              "/" +
                              data?.data_object.banner.filename
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
                        <td className="scrolltabss">
                          {/* Display description for English */}
                          <p>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data?.data_object?.english.description,
                              }}
                            ></span>
                          </p>
                        </td>
                        <td className="scrolltabss">
                          {/* Display description for Marathi */}
                          <p>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data?.data_object?.marathi.description,
                              }}
                            ></span>
                          </p>
                        </td>
                      </tr>
                    ) : (
                      <> </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card card-info">
            <div className="row mb-4 mt-4">
              {data?.data_object && (
                <div className="col-lg-9 border_names">
                  <form className="form-horizontal">
                    <div className="card-body">
                      <div className="formada">
                        <div className="form-group row">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-4 col-form-label"
                          >
                            Edit Status :
                          </label>
                          <div className="col-sm-8">
                            <div className="d-flex align-items-center">
                              <Form.Check
                                type="radio"
                                id="approveRadio"
                                name="Accepted"
                                checked={status === "Accepted"}
                                onChange={handleChange}
                              />
                              <label
                                style={{ margin: 0 }}
                                htmlFor="approveRadio"
                              >
                                Approve
                              </label>
                            </div>

                            <div className="d-flex align-items-center">
                              <Form.Check
                                type="radio"
                                id="rejectRadio"
                                name="Rejected"
                                checked={status === "Rejected"}
                                onChange={handleChange}
                              />
                              <label
                                style={{ margin: 0 }}
                                htmlFor="rejectRadio"
                              >
                                Reject
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <button className="submit123 mt-4" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
        {/* <div className="contentofpages">
          <h4 className="page-title">• View Library Documents</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>Image</th>
                      <th className="heighttab" style={{ width: "35%" }}>
                        Description
                      </th>
                      <th className="heighttab" style={{ width: "35%" }}>
                        वर्णन
                      </th>
                      <th style={{ width: "15%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.english && data?.marathi ? (
                      <tr>
                        <td>
                          <a
                            href={
                              API.baseUrl +
                              data.banner.destination +
                              "/" +
                              data.banner.filename
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
                        <td className="scrolltabss">
                          <p>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data.english.description,
                              }}
                            ></span>
                          </p>
                        </td>
                        <td className="scrolltabss">
                          <p>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data.marathi.description,
                              }}
                            ></span>
                          </p>
                        </td>
                      </tr>
                    ) : (
                      <> </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default ViewWorkflowLibrary;
