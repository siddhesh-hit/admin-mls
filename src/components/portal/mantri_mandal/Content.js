const Content = () => {
  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• Add Mantrimandal</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal">
                    <div className="card-body border_names">
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Ministry Type :
                        </label>
                        <div className="col-sm-8">
                          <select className="form-control">
                            <option>Select Ministry Type</option>
                            <option>Chief Minister</option>
                            <option>Deputy Chief Minister</option>
                            <option>Minister</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Assembly Number :
                        </label>
                        <div className="col-sm-8">
                          <select className="form-control">
                            <option>Select Department</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Member Name :
                        </label>
                        <div className="col-sm-8">
                          <select className="form-control">
                            <option>Select User</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Designation :
                        </label>
                        <div className="col-sm-8">
                          <select className="form-control">
                            <option>Select User</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Ministry :
                        </label>
                        <div className="col-sm-8">
                          <select className="form-control">
                            <option>Select User</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                          </select>
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

export default Content;
