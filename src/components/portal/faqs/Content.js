import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import remove from "../../../images/remove.svg";
import addwhite from "../../../images/addwhite.svg";
import back from "../../../images/back.svg";

import { postApi } from "../../../services/axiosInterceptors";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const Content = () => {
  const [divCount, setDivCount] = useState(1);
  const [data, setData] = useState({
    marathi: {
      question: "",
      answer: "",
    },
    english: {
      question: "",
      answer: "",
    },
  });

  const navigate = useNavigate();

  // const addDiv = () => {
  //   let newData = {
  //     marathi: {
  //       question: "",
  //       answer: "",
  //     },
  //     english: {
  //       question: "",
  //       answer: "",
  //     },
  //   };
  //   setData([...data, newData]);
  //   setDivCount(divCount + 1);
  //   alert("You've added one field");
  // };

  // const removeDiv = (index) => {
  //   let newData = [...data];

  //   newData.splice(index, 1);
  //   setData(newData);

  //   if (divCount > 1) {
  //     setDivCount(divCount - 1);
  //   }
  //   alert("You've removed one field");
  // };

  const handleChange = (e, index) => {
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

  const handleSubmit = async () => {
    await postApi("faq", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Added FAQ");
          setTimeout(() => {
            navigate("/ViewAllFaqs");
          }, 1100);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditorChange = (event, value, name) => {
    // const { name, value } = e.target;
    const [field, subField] = name.split("_");
    setData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value?.getData(),
      },
    }));
  };
  console.log(data);
  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/ViewAllFaqs" className="addpagess">
          <img src={back} style={{ width: "25px" }} alt="add" />
          Go back
        </Link>
        <h4 className="page-title">• Add Faq's</h4>
        <div className="card card-info">
          <div className="row mb-4 mt-4">
            <div className="col-lg-9">
              <form className="form-horizontal">
                <div className="card-body ">
                  {/* {[...Array(divCount)].map((_, index) => ( */}
                  <div className="formada border_names">
                    <div className="form-group row mb-5">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-3 col-form-label"
                      >
                        Add Question :
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="english_question"
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Enter Question"
                        />
                        <input
                          type="text"
                          name="marathi_question"
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
                        Add Answer :
                      </label>
                      <div className="col-sm-9">
                        <CKEditor
                          editor={ClassicEditor}
                          // data={editorData}
                          name="english_answer"
                          onChange={(event, editor) =>
                            handleEditorChange(event, editor, "english_answer")
                          }
                        />
                        <CKEditor
                          editor={ClassicEditor}
                          // data={editorData}
                          name="marathi_answer"
                          onChange={(event, editor) =>
                            handleEditorChange(event, editor, "marathi_answer")
                          }
                        />
                        {/* <textarea
                          type="text"
                          name="english_answer"
                          onChange={handleChange}
                          style={{ height: "auto !important" }}
                          className="form-control mb-3"
                          placeholder="Enter Answer"
                        />
                        <textarea
                          type="text"
                          name="marathi_answer"
                          onChange={handleChange}
                          style={{ height: "auto !important" }}
                          className="form-control"
                          placeholder="वर्णन प्रविष्ट करा"
                        /> */}
                      </div>
                    </div>
                    {/* {index === 0 && (
                        <div
                          onClick={() => addDiv()}
                          className="addSubButton mt-3 mb-3"
                        >
                          <img src={addwhite} alt="add" />
                        </div>
                      )}
                      {index !== 0 && (
                        <div
                          onClick={() => removeDiv(index)}
                          className="addSubButton mt-3 mb-3"
                        >
                          <img src={remove} alt="remove" />
                        </div>
                      )} */}
                  </div>
                  {/* ))} */}
                </div>
              </form>
            </div>
          </div>
          <button className="submit123 mt-4" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
