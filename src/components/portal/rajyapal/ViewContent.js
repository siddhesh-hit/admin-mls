import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "../../../images/add.svg";

import { API } from "../../../config/api";

import { useDataFetchingForBothApis } from "../../../hooks/useDataFetchingForBothApis";
import LoadingComponent from "../../../components/common/Loading";

const ViewContent = () => {
  const { data, loading, error } = useDataFetchingForBothApis("rajyapal");
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddRajyapal" className="addpagess">
          <img src={add} alt="add" />
          Add Rajyapal
        </Link>
        <h4 className="page-title">• View Rajyapal</h4>
        <div className="card card-info">
          <table className="table table-striped table-bordered mb-0 view_vidhan_mandal respon">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Elected date</th>
                <th>Gender</th>
                <th>Place of Birth</th>
                <th>Political Career</th>
                <th>Name (Marathi)</th>
                <th>Elected date (Marathi)</th>
                <th>Gender (Marathi)</th>
                <th>Place of Birth (Marathi)</th>
                <th>Political Career (Marathi)</th>
                <th>URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.marathi && data.english && data.image && (
                <tr>
                  <td>{1}</td>
                  <td>
                    <a
                      href={
                        API.baseUrl +
                        data.image.destination +
                        "/" +
                        data.image.filename
                      }
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
                  <td>
                    <p>{data.english.name}</p>
                  </td>
                  <td>
                    <p>{data.english.elected_date}</p>
                  </td>
                  <td>
                    <p>{data.english.gender}</p>
                  </td>
                  <td>
                    <p>{data.english.place_of_birth}</p>
                  </td>
                  <td>
                    <p dangerouslySetInnerHTML={{ __html: data.english.political_career }}></p>
                  </td>
                  <td>
                    <p>{data.marathi.name}</p>
                  </td>
                  <td>
                    <p>{data.marathi.elected_date}</p>
                  </td>
                  <td>
                    <p>{data.marathi.gender}</p>
                  </td>
                  <td>
                    <p>{data.marathi.place_of_birth}</p>
                  </td>
                  <td>
                    <p dangerouslySetInnerHTML={{ __html: data.marathi.political_career }}></p>
                  </td>
                  <td>
                    <p>{data.url}</p>
                  </td>
                  <td>
                    <Link to={`/EditRajyapal?id=${data._id}`}>
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
  );
};

export default ViewContent;
