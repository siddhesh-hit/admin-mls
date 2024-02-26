import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";

import { getApi } from "../../../services/axiosInterceptors";

const ViewAudit = () => {
  const [data, setData] = useState({
    create: [],
    update: [],
    delete: [],
  });

  const [query, setQuery] = useState("");

  const fetchData = async (query = "") => {
    await getApi(query === "null" ? `audit?userId=${null}` : `audit`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Audits</h4>

          <div className="usetype">
            <h3>•Select User Type</h3>
            <select
              className="form-control mb-4"
              name="election_data.constituency"
              value={query}
              onChange={handleChange}
            >
              <option hidden>Select Profile</option>
              <option value={"user"}>User</option>
              <option value={"null"}>Guest</option>
            </select>
            <div className="card card-info">
              <div className="row">
                <div className="col-lg-12">
                  <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Activity</th>
                        <th>User Agent</th>
                        <th>Client Side</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data?.length > 0 ? (
                        data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <h4>{index + 1}</h4>
                            </td>
                            <td>{item?.userId?.full_name || "Guest"}</td>
                            <td>{item?.statusCode}</td>
                            <td>{item?.message}</td>
                            <td>{item?.userAgent.split("/")[0]}</td>
                            <td>{item?.clientSide || "localHost"}</td>
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
      <Footer />
    </div>
  );
};

export default ViewAudit;
