import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getApiById } from "../../../services/axiosInterceptors";

const ViewContent = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("helpdesk", id)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• View Helpdesk</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th className="heighttab">Address</th>
                    <th className="heighttab">Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <tr>
                      <td>1</td>
                      <td>{data.full_name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone_number}</td>
                      <td>{data.address}</td>
                      <td>{data.feedback}</td>
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

export default ViewContent;
