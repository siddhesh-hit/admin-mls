import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import add from "../../../images/back.svg";

import { postApi } from "../../../services/axiosInterceptors";

const AddContent = () => {
  const [data, setData] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postApi("sessionField", data)
      .then((res) => {
        if (res.data.success) {
          navigate("/ViewSessionField");
          toast.success("Session Field created!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <a className="addpagess" href="/ViewSessionField">
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </a>
          <h4 className="page-title">• Add Session Field</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="card-body border_names">
                      <div
                        className="form-group row"
                        style={{ marginBottom: "10px" }}
                      >
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Add Session Field :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="name"
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                              }))
                            }
                            className="form-control"
                            placeholder="Enter Session Field"
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="submit123 mt-5">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
