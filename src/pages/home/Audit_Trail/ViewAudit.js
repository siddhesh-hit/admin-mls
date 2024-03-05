import { useEffect, useState } from "react";

import Paginate from "../../../components/common/Paginate";
import TotalEntries from "../../../table/TotalEntries";

import { getApi } from "../../../services/axiosInterceptors";

const ViewAudit = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState({
    user: "",
    message: "",
  });

  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
  });

  const fetchData = async () => {
    await getApi(
      query.user
        ? `audit?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&message=${query.message}&userId=${query.user}`
        : `audit?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&message=${query.message}`
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

  useEffect(() => {
    fetchData(query);
  }, [query, pageOptions.current, pageOptions.page, query.message]);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Audits</h4>

          <div className="usetype">
            <h3>•Select User Type</h3>
            <select
              className="form-control mb-4"
              name="election_data.constituency"
              value={query.user}
              onChange={(e) =>
                setQuery((prev) => ({
                  ...prev,
                  user: e.target.value,
                }))
              }
            >
              <option hidden>Select Profile</option>
              <option value={"user"}>User</option>
              <option value={"guest"}>Guest</option>
            </select>

            <TotalEntries
              returnCount={(data) =>
                setPageOptions((prev) => ({
                  ...prev,
                  page: data,
                }))
              }
              returnSearch={(data) =>
                setQuery((prev) => ({
                  ...prev,
                  message: data,
                }))
              }
            />

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
                  {count > 0 && (
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAudit;
