import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import back from "../../../images/back.svg"
import { getApiById, putApi } from "../../../services/axiosInterceptors";

const EditContent = () => {
  const [data, setData] = useState({
    title: "",
    url: "",
    description: "",
    keywords: "",
    author: "",

  });
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("seo", id)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await putApi("seo", id, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("seo updated successfully!");
          setTimeout(() => {
            navigate("/ViewSEO");
          }, 1110);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChamge = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <a className="addpagess" href="/ViewSEO">
            <img src={back} alt="add" style={{ width: 25 }} />
            Go back
          </a>
          <h4 className="page-title">• Edit SEO</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="card-body border_names">
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Website Name or Page Title :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter Website Name or Page Title"
                            name="title"
                            value={data.title}
                            onChange={(e) =>
                              handleChamge("title", e.target.value)
                            }
                          />

                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Website page  :
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-control mb-3"
                          type="text"
                          value={data.url}
                          placeholder="Enter Page example: /home"
                          onChange={(e) => handleChamge("url", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Author Name:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          value={data.author}
                          placeholder="Enter Author Name: eg: Jhon Doe"
                          onChange={(e) => handleChamge("author", e.target.value)}
                          className="form-control mb-3"

                        />

                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Description:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          placeholder="Enter description"
                          value={data.description}
                          onChange={(e) => handleChamge("description", e.target.value)}
                          className="form-control mb-3"

                        />

                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Keywords:
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          value={data.keywords}
                          placeholder="Enter Keywords eg: seo, digital marketing, web development, etc."
                          onChange={(e) => handleChamge("keywords", e.target.value)}
                          className="form-control mb-3"

                        />

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
