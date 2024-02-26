import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "../../../images/add.svg";

import { useDataFetchingForBothApis } from "../../../hooks/useDataFetching";
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
                    <th>Ministry Type</th>
                    <th>Assembly Number</th>
                    <th>Member Name</th>
                    <th>Designation</th>
                    <th>Ministry </th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <tr>
                      <td>{data?.ministry_type}</td>
                      <td>
                        <h4>{data?.assembly_number}</h4>
                      </td>
                      <td>
                        <p>{data?.member_name}</p>
                      </td>
                      <td>
                        <p>{data?.designation}</p>
                      </td>
                      <td>{data?.ministry}</td>
                      <td>
                        <Link to={`/EditMantriMandal?id=${data._id}}`}>
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
