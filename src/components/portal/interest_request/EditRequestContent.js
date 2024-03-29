import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getApiById, putApi } from "../../../services/axiosInterceptors";
import { toast } from "react-toastify";

const EditRequestContent = () => {
  const [data, setData] = useState({});
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("request", id)
      .then((res) => {
        setData(res.data.data);
        setIsAccepted(res.data.data.isAccepted);
        setIsRejected(res.data.data.isRejected);
      })
      .catch((err) => console.log(err));
  };

  const handleAcceptedToggle = () => {
    if (isAccepted) {
      setIsAccepted(false);
      setIsRejected(false);

      setData((prev) => ({
        ...prev,
        isAccepted: false,
        isRejected: false,
      }));
    } else {
      setIsAccepted(true);
      setIsRejected(false);
      setData((prev) => ({
        ...prev,
        isAccepted: true,
        isRejected: false,
      }));
    }
  };

  const handleRejectedToggle = () => {
    if (isRejected) {
      setIsRejected(false);
      setIsAccepted(true);

      setData((prev) => ({
        ...prev,
        isAccepted: true,
        isRejected: false,
      }));
    } else {
      setIsRejected(true);
      setIsAccepted(false);
      setData((prev) => ({
        ...prev,
        isAccepted: true,
        isRejected: false,
      }));
    }
  };

  const handleSubmit = async () => {
    await putApi("request", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Request updated successfully!");
          setTimeout(() => {
            navigate(`/ViewRequest?id=${id}`);
          }, 1110);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Edit Request</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div className="border_name">
                <form className="form-horizontal">
                  <React.Fragment>
                    <div className="card-body"></div>
                  </React.Fragment>
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        *Edit Accepted :
                      </label>
                      <div className="col-sm-8">
                        <div
                          className={`toggle-button ${
                            isAccepted ? "active" : ""
                          }`}
                          onClick={handleAcceptedToggle}
                        >
                          <div
                            className={`slider ${isAccepted ? "active" : ""}`}
                          />
                          <div className="button-text">
                            {isAccepted ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        *Edit Rejected :
                      </label>
                      <div className="col-sm-8">
                        <div
                          className={`toggle-button ${
                            isRejected ? "active" : ""
                          }`}
                          onClick={handleRejectedToggle}
                        >
                          <div
                            className={`slider ${isRejected ? "active" : ""}`}
                          />
                          <div className="button-text">
                            {isRejected ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <button className="submit123 mt-5" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRequestContent;
