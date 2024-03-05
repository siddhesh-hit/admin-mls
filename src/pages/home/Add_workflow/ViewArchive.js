import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import history from "../../../images/history.svg";

import { getApi, postApi, putApi } from "../../../services/axiosInterceptors";
import { pageName } from "../../../data/fileName";
import { toast } from "react-toastify";

const ViewArchive = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await getApi(`/archive?action=Archive&isReverted=${false}`)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (data) => {
    await putApi(`/archive/`, data?._id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Unarchived the data!");
          fetchData();
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to="/ViewWorkflowHistory" className="addpagess">
            <img src={history} alt="history" />
            Workflow history
          </Link>
          <h4 className="page-title">• View Archive</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Performed On</th>
                      <th>Action</th>
                      <th>Model Name</th>
                      {/* <th>State</th> */}
                      <th>View</th>
                      {/* <th>Edit</th> */}
                      <th>Unarchive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data?.length > 0 ? (
                      data?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{index + 1}</h4>
                          </td>
                          <td>
                            {new Date(item?.performed_on).toLocaleString()}
                          </td>
                          <td>{item?.action}</td>
                          <td>{item?.modelName}</td>
                          {/* <td>{item?.state}</td> */}
                          <td>
                            {item?.modelName === "MandalGallery" ? (
                              <Link
                                to={`https://mlsapi.sblcorp.com/images/mandal/${item?.modelId}`}
                              >
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => (
                                    <Tooltip {...props}>View the data.</Tooltip>
                                  )}
                                  placement="bottom"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </OverlayTrigger>
                              </Link>
                            ) : (
                              <Link
                                to={`/${pageName[item?.modelName]}?id=${
                                  item.modelId
                                }`}
                              >
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => (
                                    <Tooltip {...props}>View the data.</Tooltip>
                                  )}
                                  placement="bottom"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </OverlayTrigger>
                              </Link>
                            )}
                          </td>
                          {/* <td>
                            <Link
                              to={`/EditWorkflow?id=${item._id}&action=${item.action}`}
                            >
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
                          </td> */}
                          <td>
                            <button onClick={() => handleUpdate(item)}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>
                                    Unarchive the data.
                                  </Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i
                                  className="fa fa-archive"
                                  aria-hidden="true"
                                ></i>
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
    </div>
  );
};

export default ViewArchive;
