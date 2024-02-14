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
    await getApiById("district", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const [field, subField] = name.split("_");

    setData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    data.isUpdated = true;
    await putApi("district", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Updated district");
          setTimeout(() => {
            navigate("/ViewDistrict");
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
        <Link to="/ViewDistrict" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit District</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              {data && data.marathi && data.english && (
                <form className="form-horizontal border_names">
                  <div className="card-body">
                    <div className="formada">
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          *Edit District Name :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english_district"
                            defaultValue={data.english.district}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter District Name"
                          />
                          <input
                            type="text"
                            name="marathi_district"
                            defaultValue={data.marathi.district}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="जिल्ह्याचे नाव प्रविष्ट करा"
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
