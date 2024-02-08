import { useState } from "react";
import { toast } from "react-toastify";

import { postApi } from "../../../services/axiosInterceptors";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [data, setData] = useState({
    full_name: "",
    houses: "",
    department: "",
    designation: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    user_image: "",
  });

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
          setData((prev) => ({
            ...prev,
            [name]: files[0],
          }));
        }
      } else {
        alert("Only upload JPEG/JPG/PNG format images");
      }
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(data);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("user_image", data.user_image);

    await postApi("/user/invite", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("User Added Successfully");
          navigate("/ViewPortalUsers");
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        console.log(err);
      });
  };

  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <h4 className="page-title">• Add Portal User</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Name :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="full_name"
                        defaultValue={data.full_name}
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
                      Add Houses :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="houses"
                        defaultValue={data.houses}
                        onChange={handleChange}
                      >
                        <option hidden>Select Houses</option>
                        <option>Houses 2</option>
                        <option>Houses 3</option>
                        <option>Houses 4</option>
                        <option>Houses 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Department :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="department"
                        defaultValue={data.department}
                        onChange={handleChange}
                      >
                        <option hidden>Select Department</option>
                        <option>Department 2</option>
                        <option>Department 3</option>
                        <option>Department 4</option>
                        <option>Department 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Designation :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="designation"
                        defaultValue={data.designation}
                        onChange={handleChange}
                      >
                        <option hidden>Select Designation</option>
                        <option>Designation 2</option>
                        <option>Designation 3</option>
                        <option>Designation 4</option>
                        <option>Designation 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Email Id :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="email"
                        defaultValue={data.email}
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
                      Add Mobile Number :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="phone_number"
                        defaultValue={data.phone_number}
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
                      Add Date Of Birth :
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="date"
                        name="date_of_birth"
                        defaultValue={data.date_of_birth}
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
                      Add Gender :
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control select2 mb-3"
                        name="gender"
                        defaultValue={data.gender}
                        onChange={handleChange}
                      >
                        <option hidden>Enter Gender</option>
                        <option>Gender 2</option>
                        <option>Gender 3</option>
                        <option>Gender 4</option>
                        <option>Gender 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-3 col-form-label"
                    >
                      Add Profile :
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        <input
                          type="file"
                          title={data.user_image.name || "Please choose a file"}
                          name="user_image"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleChange}
                          className="custom-file-input"
                          id="customFile"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Profile - {data.user_image.name || ""}
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

export default Content;
