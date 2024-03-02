import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import retrieve from "../../../images/retrieve.svg";

import { getApi, postApi } from "../../../services/axiosInterceptors";
import { newPageName } from "../../../data/fileName";
import { toast } from "react-toastify";

const ViewHistory = () => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const roleOpt = ["Create", "Update", "Delete"];

  const navigate = useNavigate();

  const handleRetrieve = async (id) => {
    await postApi("/reset/retrieve", { id })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // navigate('/')
        }
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      await getApi(role ? `reset?action=${role}` : `reset`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [role]);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        {/* <Link to="/AddFaqs" className="addpagess">
          <img src={add} alt="add" />
          Add Pending
        </Link> */}

        <select
          style={{
            float: "right",
            height: "30px",
            backgroundColor: "#ffffff",
            border: "1px solid #ffffff",
            borderRadius: "5px",
          }}
          defaultValue={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option hidden>Select a role type</option>
          {roleOpt.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <h4 className="page-title">• View Workflow History</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Performed On</th>
                    <th>Action</th>
                    <th>ModelName</th>
                    {/* <th>ModelId</th> */}
                    <th>View</th>
                    <th>Reset</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.map((item, index) => (
                      <tr key={index}>
                        <td>{new Date(item?.performed_on).toLocaleString()}</td>
                        <td>{item.action}</td>
                        <td>{item.modelName}</td>
                        {/* <td>{item.modelId}</td> */}
                        <td>
                          <Link
                            to={`/${newPageName[item?.modelName]}?id=${
                              item._id
                            }&pending=update`}
                          >
                            <OverlayTrigger
                              delay={{ hide: 450, show: 300 }}
                              overlay={(props) => (
                                <Tooltip {...props}>View the data.</Tooltip>
                              )}
                              placement="bottom"
                            >
                              <i className="fa fa-eye"></i>
                            </OverlayTrigger>
                          </Link>
                        </td>
                        <td>
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>Retrieve the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <button onClick={() => handleRetrieve(item._id)}>
                              {/* <img src={retrieve} alt="retrieve" width="15px" /> */}
                              Retrieve
                            </button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHistory;
