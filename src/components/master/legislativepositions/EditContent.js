import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import add from "../../../images/back.svg";
import { getApiById, putApi } from "../../../services/axiosInterceptors";
const EditContent = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.search.split("=")[1];
  const fetchData = async () => {
    await getApiById("position", id)
      .then((res) => {
        setData(res.data.data.name);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    await putApi("position", id, { name: data })
      .then((res) => {
        if (res.data.success) {
          toast.success("Updated Position");
          setTimeout(() => {
            navigate("/ViewLegislativePositions");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <a className="addpagess" href="/ViewPresidingOfficers">
          <img src={add} alt="add" style={{ width: 25 }} />
          Go back
        </a>
        <h4 className="page-title">• Edit Position</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div className="">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="card-body border_names">
                    <div className="form-group row" style={{ marginBottom: '10px' }}>
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Edit Position Name :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Designation"
                          value={data}
                          onChange={(e) => {
                            setData(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <button onClick={handleSubmit} className="submit123 mt-5">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default EditContent;
