import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "../../../images/back.svg";

import { getApiById, putApi } from "../../../services/axiosInterceptors";

const EditContent = () => {
  const [data, setData] = useState({});
  const [updatedField, setUpdatedField] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("constituency", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const [field, subField] = name.split(".");

    if (!updatedField.includes(subField)) {
      setUpdatedField((prev) => [...prev, subField]);
    }

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
    await putApi("constituency", id, data)
      .then(() => {
        let message = "";
        updatedField.map((ele, index, array) =>
          index === array.length - 1
            ? (message += `${ele.replace(/_/g, " ").toUpperCase()}`)
            : (message += `${ele.replace(/_/g, " ").toUpperCase()}, `)
        );
        toast.success(`${message ? message : "Constituency"} updated.`);
        setTimeout(() => {
          navigate("/ViewConstituency");
        }, 1100);
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
        <Link to="/ViewConstituency" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Constituency</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              {data && data.marathi && data.english && (
                <>
                  <form className="form-horizontal border_names">
                    <div className="card-body">
                      <div className="formada">
                        <div className="form-group row mb-5">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            Edit Constituency Name :
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              name="english.constituency_assembly"
                              defaultValue={data.english.constituency_assembly}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="Enter Constitution Name"
                            />
                            <input
                              type="text"
                              name="marathi.constituency_assembly"
                              defaultValue={data.marathi.constituency_assembly}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="संविधानाचे नाव प्रविष्ट करा"
                            />
                          </div>
                        </div>
                        <div className="form-group row mb-5">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 col-form-label"
                          >
                            Edit Assembly Number :
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="number"
                              name="english.assembly_number"
                              defaultValue={data.english.assembly_number}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="Enter Assembly Number"
                            />
                            <input
                              type="number"
                              name="marathi.assembly_number"
                              defaultValue={data.marathi.assembly_number}
                              onChange={handleChange}
                              className="form-control mb-3"
                              placeholder="विधानसभा क्रमांक प्रविष्ट करा"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
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
