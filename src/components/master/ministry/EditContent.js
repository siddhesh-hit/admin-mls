import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "../../../images/back.svg";

import { getApiById, putApi } from "../../../services/axiosInterceptors";

const EditContent = () => {
  const [data, setData] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("minister", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    data.isUpdated = true;
    await putApi("minister", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Updated ministry");
          setTimeout(() => {
            navigate("/ViewMinistry");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewMinistry" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Ministry</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              {data && (
                <form className="form-horizontal border_names">
                  <div className="card-body">
                    <div className="formada">
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          *Edit Ministry Name :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="member_name"
                            onChange={(e) => handleChange(e)}
                            defaultValue={data?.member_name}
                            className="form-control"
                            placeholder="Enter Ministry Name"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          *Edit Designation :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="designation"
                            onChange={(e) => handleChange(e)}
                            defaultValue={data?.designation}
                            className="form-control"
                            placeholder="Enter Ministry Name"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          *Edit Minister :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="ministry"
                            onChange={(e) => handleChange(e)}
                            defaultValue={data?.ministry}
                            className="form-control"
                            placeholder="Enter Ministry Name"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          *Edit Minister of State :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="ministry_type"
                            onChange={(e) => handleChange(e)}
                            defaultValue={data?.ministry_type}
                            className="form-control"
                            placeholder="Enter Ministry Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          <button className="submit123 mt-4" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
