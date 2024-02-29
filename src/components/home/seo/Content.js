import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi";
import back from "../../../images/back.svg"
import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [data, setData] = useState({
    title: "",
    url: "",
    description: "",
    keywords: "",
    author: "",


  });
  const navigate = useNavigate();

  const handleChamge = (name, value) => {

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postApi("seo", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("SEO created!");
          setTimeout(() => {
            navigate("/ViewSEO");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <a className="addpagess" href="/Dashboard">
          <img src={back} alt="back" style={{ width: 25 }} />
          Go back
        </a>
        <h4 className="page-title">• Add Meta Tags</h4>
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
            <button onClick={handleSubmit} className="submit123 mt-5">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
