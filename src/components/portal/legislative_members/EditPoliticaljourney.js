import React from "react";

import addwhite from "../../../images/addwhite.svg";
import remove from "../../../images/remove.svg";

function Politicaljourney({
  currentStep,
  data,
  handleChange,
  addDiv,
  removeDiv,
  divCount,
}) {
  if (currentStep !== 2) {
    return null;
  }
  return (
    <div className="mb-5">
      <h2 className="stepper-form">• Political Journey</h2>
      <form>
        {data.political_journey &&
          data.political_journey.map((item, index) => (
            <div className="formss border_names" key={index}>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Edit Date :
                </label>
                <div className="col-sm-8">
                  <input
                    type="date"
                    name={`political_journey.date.${index}`}
                    value={item.date}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Surname"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword3"
                  className="col-sm-4 col-form-label"
                >
                  Edit Title :
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name={`political_journey.title.${index}`}
                    defaultValue={item.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Title"
                  />
                </div>
              </div>
              {index === 0 && (
                <div onClick={addDiv} className="addSubButton">
                  <img
                    src={addwhite}
                    // style={{ height: "25px", width: "25px" }}
                    alt="add"
                  />
                </div>
              )}
              {index !== 0 && (
                <div onClick={() => removeDiv(index)} className="addSubButton">
                  <img src={remove} alt="Remove" />
                </div>
              )}
            </div>
          ))}
      </form>
    </div>
  );
}

export default Politicaljourney;
