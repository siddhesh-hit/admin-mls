import { useEffect, useState } from "react";
import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";

import { getApi } from "../../../services/axiosInterceptors";
import Paginate from "../../../components/common/Paginate";

const ViewAudit = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const [query, setQuery] = useState("");

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
  });

  const fetchData = async (query = "") => {
    await getApi(
      query === "null"
        ? `audit?userId=${false}`
        : query === "user"
        ? `audit?userId=${true}`
        : `audit?perPage=${pageOptions.current}&perLimit=${pageOptions.page}`
    )
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (e) => {
    // console.log(e.target.value);
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetchData(query);
  }, [query, pageOptions.current, pageOptions.page]);

  // console.log(query);

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
                  <Paginate
                    totalCount={count}
                    perPage={pageOptions.page}
                    handlePageChange={(currentPage) => {
                      setPageOptions((prev) => ({
                        ...prev,
                        current: currentPage,
                      }));
                    }}
                    initialPage={pageOptions.current}
                  />
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
