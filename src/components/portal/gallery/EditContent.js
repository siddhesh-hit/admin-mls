import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getApiById, putApi } from "../../../services/axiosInterceptors";
import { API } from "../../../config/api";

const EditContent = () => {
  const [data, setData] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const [serverData, setServerData] = useState([]);

  const fetchData = async () => {
    const id = location.search.split("=")[1];
    await getApiById("gallery", id)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const maxAllowedSize = 2.5 * 1024 * 1024;
    const { files } = e.target;
    if (
      files[0].type.startsWith("image/png") ||
      files[0].type.startsWith("image/jpeg") ||
      files[0].type.startsWith("image/jpg")
    ) {
      if (files[0].size > maxAllowedSize) {
        alert("Upload the file of size less than 2MB.");
      } else {
        setServerData(files[0]);
      }
    } else {
      alert("Only upload JPEG/JPG/PNG format images");
    }
  };

  console.log(serverData);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("gallery_image", serverData);

    await putApi("gallery", data._id, formData)
      .then(() => {
        toast.success("Gallery updated successfully");
        setTimeout(() => {
          navigate("/ViewGallery");
        }, 1000);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(serverData, "data here");

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div>
                <h4 className="second-title">
                  • Edit Photos and Videos Gallery
                </h4>
                <form className="form-horizontal">
                  <div className="card-body">
                    <div className="form-group row mb-0">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-4 col-form-label"
                      >
                        Edit Images :
                      </label>
                      <div className="col-sm-8">
                        <div className="custom-file">
                          <input
                            type="file"
                            title={
                              serverData.name ||
                              data.filename ||
                              "Please choose a file"
                            }
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={handleChange}
                            className="custom-file-input"
                            id="customFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            Image/Video - {serverData.name || data.filename}
                          </label>
                        </div>
                        <p className="photo_disclaimer">
                          {" "}
                          *Only upload JPEG/JPG/PNG format images
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      {data.length > 0 ? (
                        <img
                          className="mt-5"
                          src={data.name}
                          style={{ width: "200px" }}
                          alt="img"
                        />
                      ) : (
                        <img
                          className="mt-5"
                          src={
                            API.baseUrl + data.destination + "/" + data.filename
                          }
                          style={{ width: "200px" }}
                          alt="img"
                        />
                      )}
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
    </div>
  );
};

export default EditContent;
