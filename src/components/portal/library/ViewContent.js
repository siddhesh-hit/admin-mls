import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "../../../images/add.svg";

import { API } from "../../../config/api";
import { useDataFetchingForBothApis } from "../../../hooks/useDataFetchingForBothApis";
import LoadingComponent from "../../common/Loading";

const ViewContent = () => {
  const { data, loading, error } = useDataFetchingForBothApis("library");

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddLibrary" className="addpagess">
          <img src={add} alt="add" />
          Add Library
        </Link>
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
                        {/* Display description for English */}
                        <p>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: data.english.description,
                            }}
                          ></span>
                        </p>
                      </td>
                      <td className="scrolltabss">
                        {/* Display description for Marathi */}
                        <p>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: data.marathi.description,
                            }}
                          ></span>
                        </p>
                      </td>
                      <td>
                        {/* Display edit link */}
                        <Link to={`/EditLibrary?id=${data._id}`}>
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
                  ) : (
                    <> </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="contentofpages">
        <Link to="/AddLibraryDoc" className="addpagess">
          <img src={add} alt="add" />
          Add Library Document
        </Link>
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
                        {/* Display description for English */}
                        <p>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: data.english.description,
                            }}
                          ></span>
                        </p>
                      </td>
                      <td className="scrolltabss">
                        {/* Display description for Marathi */}
                        <p>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: data.marathi.description,
                            }}
                          ></span>
                        </p>
                      </td>
                      <td>
                        {/* Display edit link */}
                        <Link to={`/EditLibraryDoc`}>
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
                  ) : (
                    <> </>
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
