import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import add from "../../../images/add.svg";
import remove from "../../../images/remove.svg";
import back from "../../../images/back.svg";

import { postApi } from "../../../services/axiosInterceptors";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Content = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [data, setData] = useState({
    marathi: {
      name: "",
      electedDate: "",
      gender: "",
      placeOfBirth: "",
      politicalCareer: "",
    },
    english: {
      name: "",
      electedDate: "",
      gender: "",
      placeOfBirth: "",
      politicalCareer: "",
    },
    date_of_birth: "",
    image: {},
    url: "",
    speeches: [
      {
        year: "",
        values: [
          {
            language: "",
            content: {},
          },
        ],
      },
    ],
    isCurrent: isToggled,
  });

  const [speeches, setSpeeches] = useState([
    {
      year: "",
      values: [{ language: "", content: {} }],
    },
  ]);

  const navigate = useNavigate();

  const addDiv = (speechIndex) => {
    const newSpeeches = [...speeches];
    newSpeeches[speechIndex] = {
      ...newSpeeches[speechIndex],
      values: [
        ...newSpeeches[speechIndex].values,
        { language: "", content: {} },
      ],
    };
    setSpeeches(newSpeeches);
    alert("You've added one field");
  };

  const removeDiv = (speechIndex, languageIndex) => {
    setSpeeches((prevSpeeches) => {
      const newSpeeches = [...prevSpeeches];
      if (newSpeeches[speechIndex].values.length > 1) {
        newSpeeches[speechIndex].values.splice(languageIndex, 1);
      }
      return newSpeeches;
    });
    alert("You've removed one field");
  };

  const addSpeech = () => {
    setSpeeches((prevSpeeches) => [
      ...prevSpeeches,
      { year: "", values: [{ language: "", content: {} }] },
    ]);
    alert("You've added one field");
  };

  const removeSpeech = (speechIndex) => {
    if (speeches.length > 1) {
      const newSpeeches = speeches.filter((_, index) => index !== speechIndex);
      setSpeeches(newSpeeches);
    }
    alert("You've removed one field");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const [subName, field] = name.split("_");

    const maxAllowedSize = 2.5 * 1024 * 1024;

    // console.log(name, value, files, subName, field);
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
    } else if (name === "url" || name === "date_of_birth") {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [subName]: {
          ...prev[subName],
          [field]: value,
        },
      }));
    }
  };

  const handleSpeechChange = (e) => {
    const { name, value, files } = e.target;
    const [field, speechIndex, languageIndex] = name.split("_");
    const maxAllowedSize = 2.5 * 1024 * 1024;

    setSpeeches((prevSpeeches) => {
      const newSpeeches = [...prevSpeeches];

      if (field === "year") {
        newSpeeches[speechIndex] = {
          ...newSpeeches[speechIndex],
          year: value,
        };
      } else if (field === "language") {
        newSpeeches[speechIndex].values[languageIndex] = {
          ...newSpeeches[speechIndex].values[languageIndex],
          language: value.toLowerCase(),
        };
      } else if (field === "content" && files) {
        if (files[0].type.startsWith("application/pdf")) {
          if (files[0].size > maxAllowedSize) {
            alert("Upload the file of size less than 2MB.");
          } else {
            newSpeeches[speechIndex].values[languageIndex] = {
              ...newSpeeches[speechIndex].values[languageIndex],
              content: files[0],
            };
          }
        } else {
          alert("Only upload PDF format images");
        }
      }

      return newSpeeches;
    });

    setData((prev) => ({
      ...prev,
      speeches: speeches,
    }));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setData((prev) => ({
      ...prev,
      isCurrent: !isToggled,
    }));
  };

  const handleSubmit = async () => {
    // console.log("check");
    const formData = new FormData();

    let serverData = {
      marathi: {
        name: data.marathi.name,
        elected_date: data.marathi.electedDate,
        gender: data.marathi.gender,
        place_of_birth: data.marathi.placeOfBirth,
        political_career: data.marathi.politicalCareer,
      },
      english: {
        name: data.english.name,
        elected_date: data.english.electedDate,
        gender: data.english.gender,
        place_of_birth: data.english.placeOfBirth,
        political_career: data.english.politicalCareer,
      },
    };

    formData.append("english", JSON.stringify(serverData.english));
    formData.append("marathi", JSON.stringify(serverData.marathi));
    formData.append("url", JSON.stringify(data.url));
    formData.append("speeches", JSON.stringify(data.speeches));
    formData.append("isCurrent", data.isCurrent);
    formData.append("date_of_birth", data.date_of_birth);

    formData.append("banner", data.image);

    for (let i = 0; i < data.speeches.length; i++) {
      data.speeches[i].values.map((item) =>
        formData.append("documents", item.content)
      );
    }

    await postApi("/rajyapal", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Rajyapal Member added successfully.");
          navigate("/ViewAllRajyapal");
        }
      })
      .catch((err) => {
        toast.error("Members not created");
        console.log(err);
      });
  };

  // console.log(speeches);

  const handleEditorChange = (event, value, name, index) => {
    // const { name, value, files } = e.target;
    const [subName, field] = name.split("_");

    setData((prev) => ({
      ...prev,
      [subName]: {
        ...prev[subName],
        [field]: value?.getData(),
      },
    }));
  }
  console.log(data);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAllRajyapal" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Rajyapal</h4>
        <div className="card card-info">
          <div className="row pb-4">
            <div className="col-lg-10">
              <div className="border_name">
                <form className="form-horizontal">
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-4 col-form-label"
                      >
                        Add Profile Image :
                      </label>
                      <div className="col-sm-8">
                        <div className="custom-file">
                          <input
                            type="file"
                            title={data.image.name || "Please choose a file"}
                            name="image"
                            accept="image/png, image/jpeg, image.jpg"
                            onChange={handleChange}
                            className="custom-file-input"
                            id="customFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            Images - {data.image ? data.image.name : ""}
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
                        className="col-sm-4 col-form-label"
                      >
                        Add Name :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="english_name"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Name"
                        />
                        <input
                          type="text"
                          name="marathi_name"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="नाव प्रविष्ट करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Add Elected Date :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="string"
                          name="english_electedDate"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Elected date"
                        />
                        <input
                          type="string"
                          name="marathi_electedDate"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="निवडलेली तारीख प्रविष्ट करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Add Date of birth :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="date"
                          name="date_of_birth"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter Date of birth"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Select Gender :
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control select2 mb-3"
                          name="english_gender"
                          onChange={handleChange}
                        >
                          <option hidden>Select Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                        <select
                          className="form-control select2 mb-3"
                          name="marathi_gender"
                          onChange={handleChange}
                        >
                          <option hidden>लिंग निवडा</option>
                          <option>पुरुष</option>
                          <option>स्त्री</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Add Place Of Birth :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="english_placeOfBirth"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Place Of Birth"
                        />
                        <input
                          type="text"
                          name="marathi_placeOfBirth"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="जन्मस्थान प्रविष्ट करा"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Add Political Career :
                      </label>
                      <div className="col-sm-8">
                        <CKEditor
                          editor={ClassicEditor}
                          // data={editorData}
                          name="english_politicalCareer"
                          onChange={(event, editor) => handleEditorChange(event, editor, "english_politicalCareer")}
                        />
                        <CKEditor
                          editor={ClassicEditor}
                          // data={editorData}
                          name="marathi_politicalCareer"
                          onChange={(event, editor) => handleEditorChange(event, editor, "marathi_politicalCareer")}
                        />
                        {/* <textarea
                          type="text"
                          style={{
                            height: "100px",
                          }}
                          name="english_politicalCareer"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Political Career"
                        />
                        <textarea
                          type="text"
                          name="marathi_politicalCareer"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="राजकीय करिअरमध्ये प्रवेश करा"
                        /> */}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                      >
                        Add URL :
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          style={{
                            height: "100px",
                          }}
                          name="url"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter URL"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contentofpages">
        <h4 className="page-title">• Speeches</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-11">
              {speeches.map((speech, speechIndex) => (
                <div className="row" key={speechIndex}>
                  <div className="col-lg-11">
                    <div className="col-lg-11 mb-5">
                      <div className="form-group row mt-5">
                        <label
                          htmlFor={`speech_year_${speechIndex}`}
                          className="col-sm-3 col-form-label"
                        >
                          Add Year :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="date"
                            name={`year_${speechIndex}`}
                            onChange={handleSpeechChange}
                            className="form-control"
                            placeholder="Enter Speech Year"
                          />
                        </div>
                      </div>
                    </div>
                    {speech.values.map((_, languageIndex) => (
                      <div className="row mb-4" key={languageIndex}>
                        <div className="col-lg-11">
                          <div className="legis_members mt-0">
                            <div
                              className="card-body"
                              style={{ padding: "25px 10px 25px" }}
                            >
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="form-group row mb-0">
                                    <label
                                      htmlFor={`speech_language_${speechIndex}_${languageIndex}`}
                                      className="col-sm-4 col-form-label"
                                    >
                                      Add Language :
                                    </label>
                                    <div className="col-sm-8">
                                      <input
                                        type="text"
                                        name={`language_${speechIndex}_${languageIndex}`}
                                        onChange={handleSpeechChange}
                                        className="form-control mb-1"
                                        placeholder="Enter Speech Language "
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group row mb-0">
                                    <label
                                      htmlFor={`speech_pdf_${speechIndex}_${languageIndex}`}
                                      className="col-sm-4 col-form-label"
                                    >
                                      Add PDF :
                                    </label>
                                    <div className="col-sm-8">
                                      <div className="custom-file">
                                        <input
                                          type="file"
                                          title={
                                            speech.values[languageIndex].content
                                              .name || "Please choose a file"
                                          }
                                          name={`content_${speechIndex}_${languageIndex}`}
                                          accept="application/pdf"
                                          onChange={handleSpeechChange}
                                          className="custom-file-input"
                                          id={`customFile_${speechIndex}_${languageIndex}`}
                                        />
                                        <label
                                          className="custom-file-label"
                                          htmlFor={`customFile_${speechIndex}_${languageIndex}`}
                                        >
                                          PDF -{" "}
                                          {speeches[speechIndex].values[
                                            languageIndex
                                          ]
                                            ? speeches[speechIndex].values[
                                              languageIndex
                                            ].content.name
                                            : ""}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-1">
                          {languageIndex === 0 && (
                            <div
                              onClick={() => addDiv(speechIndex)}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                className="add"
                                alt="Add"
                                src={add}
                                style={{
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  display: "block",
                                }}
                              />
                            </div>
                          )}
                          {languageIndex !== 0 && (
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                removeDiv(speechIndex, languageIndex)
                              }
                            >
                              <img
                                src={remove}
                                alt="Remove"
                                style={{
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  display: "block",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {speechIndex === 0 && (
                    <div onClick={() => addSpeech()} className="addSubButton">
                      <img className="add" alt="Add" src={add} />
                    </div>
                  )}
                  {speechIndex !== 0 && (
                    <div
                      onClick={() => removeSpeech(speechIndex)}
                      className="addSubButton"
                    >
                      <img src={remove} alt="Remove" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="col-lg-9">
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Edit Current{" "}
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => (
                      <Tooltip {...props}>
                        Only set active, when you want to show the current
                        Rajyapal.
                      </Tooltip>
                    )}
                    placement="bottom"
                  >
                    <i className="fa-regular fa-circle-question "></i>
                  </OverlayTrigger>{" "}
                  :
                </label>
                <div className="col-sm-8">
                  <div
                    className={`toggle-button ${isToggled ? "active" : ""}`}
                    onClick={handleToggle}
                  >
                    <div className={`slider ${isToggled ? "active" : ""}`} />
                    <div className="button-text">
                      {isToggled ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="submit123 mt-5" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Content;
