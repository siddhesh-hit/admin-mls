import React, { useEffect, useState } from "react";
import add from "../../../images/back.svg";
import { useLocation } from "react-router-dom";
import { getApiById } from "../../../services/axiosInterceptors";
const EditContent = () => {
  const [data, setData] = useState({});

  const location = useLocation();
  const id = location.search.split("=")[1];

  useEffect(() => {
    const fetchData = async () => {
      await getApiById(`sessionField`, id)
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <a className="addpagess" href="/ViewSessionField">
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </a>
          <h4 className="page-title">• Edit Session Field</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal">
                    <div className="card-body border_names">
                      <div
                        className="form-group row"
                        style={{ marginBottom: "10px" }}
                      >
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Session Field :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Session Field"
                            defaultValue={data?.name}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button className="submit123 mt-5">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
