import React from "react";
import add from "../../../images/back.svg";
const AddContent = () => {
  return <div>
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <a className="addpagess" href="/ViewPresidingOfficers">
          <img src={add} alt="add" style={{ width: 25 }} />
          Go back
        </a>
        <h4 className="page-title">• Add Presiding Officer</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div className="">
                <form className="form-horizontal">
                  <div className="card-body border_names">
                    <div className="form-group row" style={{ marginBottom: '10px' }}>
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Add Presiding Officer :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Presiding Officer"
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
  </div>;
};

export default AddContent;
