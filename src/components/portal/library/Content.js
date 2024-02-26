import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import back from "../../../images/back.svg";
import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [data, setData] = useState({
    english: {
      description: "",
    },
    marathi: {
      description: "",
    },
    banner: {},
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const [field, subField] = name.split("_");
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (!files) {
      setData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
    } else {
      if (files) {
        if (
          files[0].type.startsWith("image/png") ||
          files[0].type.startsWith("image/jpeg") ||
          files[0].type.startsWith("image/jpg")
        ) {
          if (files[0].size > maxAllowedSize) {
            alert("Upload the file of size less than 2MB.");
          } else {
            setData((prev) => ({
              ...prev,
              [name]: files[0],
            }));
          }
        } else {
          alert("Only upload JPEG/JPG/PNG format images");
        }
      }
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("english", JSON.stringify(data.english));
    formData.append("marathi", JSON.stringify(data.marathi));
    formData.append("banner", data.banner);

    // console.log(formData);

    await postApi("library", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Library Added Successfully");
          setTimeout(() => {
            navigate(`/ViewLibrary?id=${res.data.data._id}`);
          }, 1100);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAllLibrary" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Library</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-9">
              <form className="form-horizontal border_names">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Banner :
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        <input
                          type="file"
                          name="banner"
                          title={data.banner.name || "Please choose a file"}
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleChange}
                          className="custom-file-input"
                          id="customFile"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Images - {data.banner ? data.banner.name : ""}
                        </label>
                      </div>
                      <p className="photo_disclaimer">
                        {" "}
                        *Only upload JPEG/JPG/PNG format images
                      </p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Description :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="english_description"
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Enter description"
                      />
                      <input
                        type="text"
                        name="marathi_description"
                        onChange={handleChange}
                        className="form-control"
                        placeholder="वर्णन प्रविष्ट करा"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button className="submit123 mt-5" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
