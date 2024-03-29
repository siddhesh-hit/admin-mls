import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { getApi } from "../../../services/axiosInterceptors";

const ViewInterestRequest = () => {
  const [data, setData] = useState({
    interest: [],
    request: [],
  });

  const fetchData = async () => {
    await getApi("interest")
      .then((res) =>
        setData((prev) => ({
          ...prev,
          interest: res.data.data,
        }))
      )
      .catch((err) => console.log(err));

    await getApi("request")
      .then((res) =>
        setData((prev) => ({
          ...prev,
          request: res.data.data,
        }))
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• View Interest Access</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th>Query (Marathi)</th>
                    <th>User</th>
                    <th>View</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.interest ? (
                    <>
                      {data.interest.map((item, index) => (
                        <tr key={index}>
                          <td>{item.query.english.navigation}</td>
                          <td>{item.query.marathi.navigation}</td>
                          <td>{item.userId.full_name}</td>
                          <td>
                            <Link to={`/ViewInterest?id=${item._id}`}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-eye"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link to={`/EditInterest?id=${item._id}`}>
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

      <div className="contentofpages">
        <h4 className="page-title">• View Request Access</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th>Query (Marathi)</th>
                    <th>User</th>
                    <th>Rejected</th>
                    <th>Accepted</th>
                    <th>View</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.request ? (
                    <>
                      {data.request.map((item, index) => (
                        <tr key={index}>
                          <td>{item.query.english.navigation}</td>
                          <td>{item.query.marathi.navigation}</td>
                          <td>{item.userId.full_name}</td>
                          <td>{data.isRejected ? "Yes" : "No"}</td>
                          <td>{data.isAccepted ? "Yes" : "No"}</td>
                          <td>
                            <Link to={`/ViewRequest?id=${item._id}`}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-eye"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link to={`/EditRequest?id=${item._id}`}>
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

export default ViewInterestRequest;
