import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import back from "../../../images/back.svg";

import { getApiById, putApi } from "../../../services/axiosInterceptors";

const EditContent = () => {
  const [data, setData] = useState({});
  const [isToggled, setIsToggled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("faq", id)
      .then((res) => {
        setData(res.data.data);
        setIsToggled(res.data.data.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
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

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setData((prev) => ({
      ...prev,
      isActive: !isToggled,
    }));
  };

  const handleSubmit = async () => {
    const newData = {
      marathi: {
        question: data.marathi.question,
        answer: data.marathi.answer,
      },

      english: {
        question: data.english.question,
        answer: data.english.answer,
      },
      isActive: data.isActive,
      isUpdated: true,
    };

    await putApi("faq", id, newData).then(() => {
      toast.success("Updated FAQ");
      setTimeout(() => {
        navigate(`/ViewFaqs?id=${id}`);
      }, 1100);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAllFaqs" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Edit Faq's</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            {data && data.english && data.marathi && (
              <div className="col-lg-9 border_names">
                <form className="form-horizontal">
                  <div className="card-body">
                    <div className="formada">
                      <div className="form-group row mb-5">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          Edit Question :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="english_question"
                            defaultValue={data.english.question}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Question"
                          />
                          <input
                            type="text"
                            name="marathi_question"
                            defaultValue={data.marathi.question}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="वर्णन प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-1">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-3 col-form-label"
                        >
                          Edit Answer :
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            style={{ height: "auto !important" }}
                            name="english_answer"
                            defaultValue={data.english.answer}
                            onChange={handleChange}
                            className="form-control mb-3"
                            placeholder="Enter Answer"
                          />
                          <textarea
                            style={{ height: "auto !important" }}
                            name="marathi_answer"
                            defaultValue={data.marathi.answer}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="वर्णन प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Status :
                        </label>
                        <div className="col-sm-8">
                          <div
                            className={`toggle-button ${
                              isToggled ? "active" : ""
                            }`}
                            onClick={handleToggle}
                          >
                            <div
                              className={`slider ${isToggled ? "active" : ""}`}
                            />
                            <div className="button-text">
                              {isToggled ? "Active" : "Inactive"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
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
