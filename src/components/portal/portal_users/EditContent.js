import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import { getApiById, putApi } from "../../../services/axiosInterceptors";

const EditContent = () => {
  const [server, setServer] = useState({});

  const location = useLocation();
  const id = location.search.split("=")[1];
  const navigate = useNavigate();

  const fetchData = async () => {
    await getApiById("user", id)
      .then((res) => {
        setServer(res.data.data);
        setServer((prev) => ({
          ...prev,
          date_of_birth: prev.date_of_birth.split("T")[0],
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const maxAllowedSize = 2.5 * 1024 * 1024;

    if (files) {
      if (
        files[0].type.startsWith("image/png") ||
        files[0].type.startsWith("image/jpeg") ||
        files[0].type.startsWith("image/jpg")
      ) {
        if (files[0].size > maxAllowedSize) {
          alert("Upload the file of size less than 2MB.");
        } else {
          setServer((prev) => ({
            ...prev,
            [name]: files[0],
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format images");
      }
    } else {
      setServer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(server));
    formData.append("user_image", server.user_image);

    await putApi("user", id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("User updated Successfully");
          navigate("/ViewPortalUsers");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(server);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Edit Portal User</h4>
        <div className="card card-info">
          <div className="row pt-5 pb-5">
            <div className="col-lg-11">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Name :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="full_name"
                        defaultValue={server?.full_name}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Houses :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="houses"
                        value={server?.houses}
                        onChange={handleChange}
                      >
                        <option hidden>Select Houses</option>
                        <option value={"Houses 2"}>Houses 2</option>
                        <option value={"Houses 3"}>Houses 3</option>
                        <option value={"Houses 4"}>Houses 4</option>
                        <option value={"Houses 5"}>Houses 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Department :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="department"
                        value={server?.department}
                        onChange={handleChange}
                      >
                        <option hidden>Select Department</option>
                        <option value={"Department 2"}>Department 2</option>
                        <option value={"Department 3"}>Department 3</option>
                        <option value={"Department 4"}>Department 4</option>
                        <option value={"Department 5"}>Department 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Designation :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="designation"
                        value={server?.designation}
                        onChange={handleChange}
                      >
                        <option hidden>Select Designation</option>
                        <option value={"Designation 2"}>Designation 2</option>
                        <option value={"Designation 3"}>Designation 3</option>
                        <option value={"Designation 4"}>Designation 4</option>
                        <option value={"Designation 5"}>Designation 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Email Id :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="email"
                        defaultValue={server?.email}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Enter Email id"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Mobile Number :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="phone_number"
                        defaultValue={server?.phone_number}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Date Of Birth :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="date"
                        name="date_of_birth"
                        defaultValue={server?.date_of_birth}
                        onChange={handleChange}
                        className="form-control mb-3"
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Gender :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="gender"
                        value={server?.gender}
                        onChange={handleChange}
                      >
                        <option hidden>Enter Gender</option>
                        <option value={"Gender 2"}>Gender 2</option>
                        <option value={"Gender 3"}>Gender 3</option>
                        <option value={"Gender 4"}>Gender 4</option>
                        <option value={"Gender 5"}>Gender 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-3 col-form-label"
                    >
                      Edit Profile :
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        <input
                          type="file"
                          title={
                            server?.user_image?.name ||
                            server?.user_image?.filename
                          }
                          accept="image/pne, image/jpg, image/jpeg"
                          name="user_image"
                          onChange={handleChange}
                          className="custom-file-input"
                          id="customFile"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Profile -{" "}
                          {server?.user_image?.name ||
                            server?.user_image?.filename}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <button className="submit123" onClick={() => handleSubmit()}>
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
