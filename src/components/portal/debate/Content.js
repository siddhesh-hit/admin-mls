import React from "react";

const Content = () => {
  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Add Debate</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Houses :
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control select2">
                        <option>Select Houses</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Title :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add Title"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Session :
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control select2">
                        <option>Select Session</option>
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Ministry :
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control select2">
                        <option>Select Ministry</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Date :
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control select2">
                        <option>Select Date</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Device :
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control select2">
                        <option>Select Device</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Debate Type :
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control select2">
                        <option>Select Debate Type</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Topic date :
                    </label>
                    <div className="col-sm-9">
                      <select className="form-control select2">
                        <option>Select Year</option>
                        <option>2023</option>
                        <option>2022</option>
                        <option>2021</option>
                        <option>2020</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Document :
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                        />
                        <label className="custom-file-label" for="customFile">
                          Add Document
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <button className="submit123">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
