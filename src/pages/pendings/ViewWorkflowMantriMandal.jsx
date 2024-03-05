import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { getApiById, putApi } from "../../services/axiosInterceptors";

const ViewWorkflowMantriMandal = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const configRoutes = {
    Create: "updatePost",
    Update: "updatePut",
    Delete: "updateDel",
  };

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("&")[0].split("=")[1];
  const action = location?.search?.split("&")[1]?.split("=")[1];

  const fetchData = async () => {
    await getApiById("pending", id)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleChange = (e) => {
    setStatus(e.target.name);
  };

  const handleSubmit = async () => {
    data.status = status;
    await putApi(`pending/${configRoutes[action]}`, id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success(`Status ${status}!`);
          setTimeout(() => {
            navigate(`/ViewAllWorkflow`);
          }, 1100);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
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
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data_object && (
                      <tr>
                        <td>{data?.data_object?.ministry_type}</td>
                        <td>
                          <h4>{data?.data_object?.assembly_number}</h4>
                        </td>
                        <td>
                          <p>{data?.data_object?.member_name}</p>
                        </td>
                        <td>
                          <p>{data?.data_object?.designation}</p>
                        </td>
                        <td>{data?.data_object?.ministry}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card card-info">
            <div className="row mb-4 mt-4">
              {data?.data_object && (
                <div className="col-lg-9 border_names">
                  <form className="form-horizontal">
                    <div className="card-body">
                      <div className="formada">
                        <div className="form-group row">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-4 col-form-label"
                          >
                            Edit Status :
                          </label>
                          <div className="col-sm-8">
                            <div className="d-flex align-items-center">
                              <Form.Check
                                type="radio"
                                id="approveRadio"
                                name="Accepted"
                                checked={status === "Accepted"}
                                onChange={handleChange}
                              />
                              <label
                                style={{ margin: 0 }}
                                htmlFor="approveRadio"
                              >
                                Approve
                              </label>
                            </div>

                            <div className="d-flex align-items-center">
                              <Form.Check
                                type="radio"
                                id="rejectRadio"
                                name="Rejected"
                                checked={status === "Rejected"}
                                onChange={handleChange}
                              />
                              <label
                                style={{ margin: 0 }}
                                htmlFor="rejectRadio"
                              >
                                Reject
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <button className="submit123 mt-4" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWorkflowMantriMandal;
