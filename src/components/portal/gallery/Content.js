import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [serverData, setServerData] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { files } = e.target;
    const maxAllowedSize = 2.5 * 1024 * 1024;
    if (
      files[0].type.startsWith("image/png") ||
      files[0].type.startsWith("image/jpeg") ||
      files[0].type.startsWith("image/jpg") ||
      files[0].type.startsWith("video/mp4") ||
      files[0].type.startsWith("video/webm") ||
      files[0].type.startsWith("video/ogg")
    ) {
      if (files[0].size > maxAllowedSize) {
        alert("Upload the file of size less than 2MB.");
      } else {
        console.log(files);
        setServerData(files[0]);
      }
    } else {
      alert("Only upload JPEG/JPG/PNG format images");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("gallery_image", serverData);

    await postApi("gallery", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Gallery added successfully");
          setTimeout(() => {
            navigate("/ViewGallery");
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  console.log(serverData);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-10">
              <div>
                <h4 className="second-title">• Photos and Videos Gallery</h4>
                <form className="form-horizontal">
                  <div className="card-body border_names">
                    <div className="form-group row mb-0">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-4 col-form-label"
                      >
                        Add Images :
                      </label>
                      <div className="col-sm-6">
                        <div className="custom-file">
                          <input
                            type="file"
                            title={
                              serverData
                                ? serverData.name || "Please choose a file"
                                : "Please choose a file"
                            }
                            accept="image/png, image/jpeg, image/jpg, video/mp4, video/webm, video/ogg"
                            name="images"
                            onChange={handleChange}
                            className="custom-file-input"
                            id="customFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            Image/Video - {serverData ? serverData.name : ""}
                          </label>
                        </div>
                        <p className="photo_disclaimer">
                          {" "}
                          *Only upload JPEG/JPG/PNG format images
                        </p>
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
    </div>
  );
};

export default Content;
