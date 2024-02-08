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
    await getApiById("session", id)
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
        <Link to="/AddSessionCalendar" className="addpagess">
          <img src={add} alt="add" />
          Add Session Calendar
        </Link>
        <h4 className="page-title">• View Session Calendar</h4>
        <div className="card card-info">
          <table className="table table-striped table-bordered mb-0 view_vidhan_mandal respon">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>English Session</th>
                <th>Marathi Session</th>
                <th>Topic Name</th>
                <th>Houses</th>
                <th>Year</th>
                <th>Date</th>
                <th>Document</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.marathi &&
                data.english &&
                data.documents.length > 0 && (
                  <tr>
                    <td>{1}</td>
                    <td>
                      <p>{data.english.session}</p>
                    </td>
                    <td>
                      <p>{data.marathi.session}</p>
                    </td>
                    <td>
                      <p>{data.topic_name}</p>
                    </td>
                    <td>
                      <p>{data.houses}</p>
                    </td>
                    <td>
                      <p>{data.year}</p>
                    </td>
                    <td>
                      <p>{data.date}</p>
                    </td>
                    <td>
                      <a
                        href={
                          API.baseUrl +
                          data.documents[0].document.destination +
                          "/" +
                          data.documents[0].document.filename
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
                    <td>
                      <Link to={`/EditSessionCalendar?id=${data._id}`}>
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
