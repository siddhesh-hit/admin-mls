import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import add from "../../../images/add.svg";
import remove from "../../../images/remove.svg";

import { postApi } from "../../../services/axiosInterceptors";

const Content = () => {
  const [divCount, setDivCount] = useState(1);
  const [serverData, setServerData] = useState([]);

  const navigate = useNavigate();

  const addDiv = () => {
    setDivCount(divCount + 1);
    alert("You've added one field");
  };

  const removeDiv = () => {
    if (divCount > 1) {
      setDivCount(divCount - 1);
      setServerData((prev) => prev.slice(0, divCount - 1));
    }
    alert("You've removed one field");
  };

  const handleChange = (e, index) => {
    const { files } = e.target;
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (
      files[0].type.startsWith("image/png") ||
      files[0].type.startsWith("image/jpeg") ||
      files[0].type.startsWith("image/jpg")
    ) {
      if (files[0].size > maxAllowedSize) {
        alert("Upload the file of size less than 2MB.");
      } else {
        if (index < divCount) {
          setServerData((prev) => {
            const newData = [...prev];
            newData[index] = files[0];
            return newData;
          });
        }
      }
    } else {
      alert("Only upload JPEG/JPG/PNG format images");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    serverData.forEach((item) => {
      formData.append("gallery_image", item);
    });

    await postApi("gallery", formData)
      .then(() => {
        toast.success("Gallery added successfully");
        setTimeout(() => {
          navigate("/ViewGallery");
        }, 1000);
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
                  {[...Array(divCount)].map((_, index) => (
                    <div className="card-body border_names" key={index}>
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
                                serverData[index]
                                  ? serverData[index].name ||
                                    "Please choose a file"
                                  : "Please choose a file"
                              }
                              accept="image/png, image/jpeg, image/jpg"
                              name="images"
                              onChange={(e) => handleChange(e, index)}
                              className="custom-file-input"
                              id="customFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Image/Video -{" "}
                              {serverData[index] ? serverData[index].name : ""}
                            </label>
                          </div>
                          <p className="photo_disclaimer">
                            {" "}
                            *Only upload JPEG/JPG/PNG format images
                          </p>
                        </div>
                        <div className="col-sm-2">
                          {index === 0 && (
                            <div onClick={addDiv} style={{ cursor: "pointer" }}>
                              <img
                                className="add"
                                alt="Add"
                                style={{ position: "relative", top: "-12px" }}
                                src={add}
                              />
                            </div>
                          )}
                          {index !== 0 && (
                            <div
                              style={{
                                position: "relative",
                                top: "-12px",
                                cursor: "pointer",
                              }}
                              onClick={removeDiv}
                            >
                              <img src={remove} alt="Remove" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
