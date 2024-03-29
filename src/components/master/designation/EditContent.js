import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "../../../images/back.svg";

import { getApiById, putApi } from "../../../services/axiosInterceptors";

const EditContent = () => {
  const [data, setData] = useState({});
  const [isToggled, setIsToggled] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("designation", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await putApi("designation", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success(`Designation updated.`);
          setTimeout(() => {
            navigate("/ViewDesignation");
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

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <a className="addpagess" href="/ViewDesignation">
            <img src={back} alt="add" style={{ width: 25 }} />
            Go back
          </a>
          <h4 className="page-title">• Edit Designation</h4>
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
                          Edit Designation :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            name="name"
                            defaultValue={data?.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Designation"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button className="submit123 mt-5" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
