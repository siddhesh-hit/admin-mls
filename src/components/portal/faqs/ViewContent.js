import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import add from "../../../images/add.svg";

import { getApiById } from "../../../services/axiosInterceptors";

const ViewContent = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("faq", id)
      .then((res) => {
        setData([res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddFaqs" className="addpagess">
          <img src={add} alt="add" />
          Add Faqs
        </Link>
        <h4 className="page-title">• View Faqs</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th style={{ width: "23%" }}>Question</th>
                    <th style={{ width: "23%" }}>प्रश्न</th>
                    <th style={{ width: "23%" }}>Answer</th>
                    <th style={{ width: "23%" }}>उत्तर</th>
                    <th style={{ width: "8%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    <>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.english.question}</td>
                          <td>{item.marathi.question}</td>
                          <td>{item.english.answer}</td>
                          <td>{item.marathi.answer}</td>
                          <td>
                            <Link to={`/EditFaqs?id=${item._id}`}>
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

export default ViewContent;
