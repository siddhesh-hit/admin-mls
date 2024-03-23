import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "../../../images/add.svg";

import { useDataFetchingForBothApis } from "../../../hooks/useDataFetchingForBothApis";
import LoadingComponent from "../../../components/common/Loading";

const Viewcontent = () => {
  const { data, loading, error } = useDataFetchingForBothApis("minister");
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddMantriMandal" className="addpagess">
          <img src={add} alt="add" />
          Add Mantri Mandal
        </Link>

        <h4 className="page-title">• View Mantri Mandal</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Assembly Number</th>
                    <th>Member Name</th>
                    <th>Ministry Type</th>
                    <th>Designation</th>
                    <th>Designation Year</th>
                    <th>Presiding Officer</th>
                    <th>Presiding Officer Year</th>
                    <th>Legislative Position</th>
                    <th>Legislative Position Year</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <tr>
                      <td>
                        <h4>{data?.assembly_number?.assembly_name}</h4>
                      </td>
                      <td>
                        <p>{data?.member_name?.basic_info.name}</p>
                      </td>
                      <td>
                        <p>
                          {data?.ministry_type?.map((item, index, array) => (
                            <span key={index}>
                              {item.ministry_name}
                              {index === array.length - 1 ? "" : ", "}
                            </span>
                          ))}
                        </p>
                      </td>
                      <td>
                        <p>
                          {data?.designation?.map((item, index, array) => (
                            <span key={index}>
                              {item.name}
                              {index === array.length - 1 ? "" : ", "}
                            </span>
                          ))}
                        </p>
                      </td>
                      <td>
                        <p>
                          {"From " +
                            new Date(data?.des_from)
                              .toISOString()
                              .slice(0, 10) +
                            " To " +
                            new Date(data?.des_to).toISOString().slice(0, 10)}
                        </p>
                      </td>
                      <td>
                        <p>
                          {data?.presiding?.map((item, index, array) => (
                            <span key={index}>
                              {item.name}
                              {index === array.length - 1 ? "" : ", "}
                            </span>
                          ))}
                        </p>
                      </td>
                      <td>
                        <p>
                          {"From " +
                            new Date(data?.pres_from)
                              .toISOString()
                              .slice(0, 10) +
                            " To " +
                            new Date(data?.pres_to).toISOString().slice(0, 10)}
                        </p>
                      </td>
                      <td>
                        <p>
                          {data?.legislative_position?.map(
                            (item, index, array) => (
                              <span key={index}>
                                {item.name}
                                {index === array.length - 1 ? "" : ", "}
                              </span>
                            )
                          )}
                        </p>
                      </td>
                      <td>
                        <p>
                          {"From " +
                            new Date(data?.lp_from).toISOString().slice(0, 10) +
                            " To " +
                            new Date(data?.lp_to).toISOString().slice(0, 10)}
                        </p>
                      </td>
                      <td>
                        <Link to={`/EditMantriMandal?id=${data._id}`}>
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

export default Viewcontent;
