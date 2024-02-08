import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "../../../images/add.svg";

import { getApiById } from "../../../services/axiosInterceptors";
import { API } from "../../../config/api";

const ViewContent = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("rajyapal", id)
      .then((res) => {
        setData(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dateToFromat = (date) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da}-${mo}-${ye}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  console.log(data);

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
                    <p>{data.english.political_career}</p>
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
                    <p>{data.marathi.political_career}</p>
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
