import { useState } from "react";

import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";

import add from "../../../images/back.svg";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditContact = () => {
  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <a className="addpagess" href="/Dashboard">
            <img src={add} alt="add" style={{ width: 25 }} />
            Go back
          </a>
          <h4 className="page-title">• Edit Contact Us</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-10">
                <div className="">
                  <form className="form-horizontal">
                    <div className="card-body border_names">
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Address :
                        </label>
                        <div className="col-sm-8">
                          <CKEditor
                            editor={ClassicEditor}
                          // data={editorData}
                          />
                          <CKEditor
                            editor={ClassicEditor}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Email :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter Email"
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ईमेल प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Fax Number :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter Fax Number"
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="फॅक्स क्रमांक प्रविष्ट करा"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputPassword3"
                          className="col-sm-4 col-form-label"
                        >
                          Edit Legislature No :
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter Legislature No"
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="विधानमंडळ क्रमांक प्रविष्ट करा"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button className="submit123 mt-5">Update</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditContact;
