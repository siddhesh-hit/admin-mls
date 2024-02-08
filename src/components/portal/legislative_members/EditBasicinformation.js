function Basicinformation({ currentStep, data, handleChange, error, Data }) {
  if (currentStep !== 1) {
    return null;
  }

  return (
    <div className="mb-5">
      <h2 className="stepper-form">• Edit Basic Information</h2>
      <form className="border_names">
        <div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
              Edit House :
            </label>
            <div className="col-sm-8">
              <input
                className="form-check-input"
                type="radio"
                name="basic_info.house"
                value="Council"
                checked={data.basic_info.house === "Council"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Council
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="basic_info.house"
                value="Assembly"
                checked={data.basic_info.house === "Assembly"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Assembly
              </label>
            </div>
          </div>

          {data.basic_info.house === "Assembly" && (
            <div className="form-group row">
              <label
                htmlFor="inputPassword3"
                className="col-sm-4 col-form-label"
              >
                Assembly Number :
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name="basic_info.assembly_number"
                  value={data.basic_info.assembly_number}
                  onChange={handleChange}
                >
                  <option hidden>Select Assembly Number</option>
                  {Data.assembly.length > 0 ? (
                    Data.assembly.map((item) => (
                      <option
                        key={item._id}
                        value={item.english.assembly_number}
                      >
                        {item.english.assembly_number}
                      </option>
                    ))
                  ) : (
                    <option hidden>Select Assembly Number</option>
                  )}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
            Edit Profile :
          </label>
          <div className="col-sm-8">
            <div className="custom-file">
              <input
                type="file"
                title={
                  data.basic_info.profile.filename ||
                  data.basic_info.profile.name ||
                  "Please choose a file"
                }
                name="basic_info.profile"
                accept="image/png, image/jpeg, image.jpg"
                onChange={handleChange}
                className="custom-file-input"
                id="customFile"
              />
              <label className="custom-file-label" htmlFor="customFile">
                Image -{" "}
                {data.basic_info.profile.filename ||
                  data.basic_info.profile.name}
              </label>
            </div>
            <p className="photo_disclaimer">
              {" "}
              *Only upload JPEG/JPG/PNG format images
            </p>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Name :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.name"
              defaultValue={data.basic_info.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Surname :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.surname"
              defaultValue={data.basic_info.surname}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Surname"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Constituency :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.constituency"
              value={data.basic_info.constituency}
              onChange={handleChange}
            >
              <option hidden>Select Constituency</option>
              {Data.constituency.length > 0 ? (
                Data.constituency.map((item) => (
                  <option
                    key={item._id}
                    value={item.english.constituency_assembly}
                  >
                    {item.english.constituency_assembly}
                  </option>
                ))
              ) : (
                <option hidden>Select Constituency</option>
              )}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Party :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.party"
              value={data.basic_info.party}
              onChange={handleChange}
            >
              <option hidden>Select Party</option>
              {Data.party.length > 0 ? (
                Data.party.map((item) => (
                  <option key={item._id} value={item.english.party_name}>
                    {item.english.party_name}
                  </option>
                ))
              ) : (
                <option hidden>Select Party</option>
              )}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Gender :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.gender"
              value={data.basic_info.gender}
              onChange={handleChange}
            >
              <option hidden>Select Gender</option>
              {Data.gender.length > 0 ? (
                Data.gender.map((item) => (
                  <option key={item._id} value={item.english.gender}>
                    {item.english.gender}
                  </option>
                ))
              ) : (
                <option hidden>Select Gender</option>
              )}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit District :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.district"
              value={data.basic_info.district}
              onChange={handleChange}
            >
              <option hidden>Select District</option>
              {Data.district.length > 0 ? (
                Data.district.map((item) => (
                  <option key={item._id} value={item.english.district}>
                    {item.english.district}
                  </option>
                ))
              ) : (
                <option hidden>Select District</option>
              )}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit First Time Elected ? :
          </label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="basic_info.first_time_elected"
              value={data.basic_info.first_time_elected}
              onChange={handleChange}
            >
              <option hidden>Select Option</option>
              <option>YES</option>
              <option>NO</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Date of Birth :
          </label>
          <div className="col-sm-8">
            <input
              type="date"
              name="basic_info.date_of_birth"
              defaultValue={data.basic_info.date_of_birth}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Surname"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Place of Birth :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.place_of_birth"
              defaultValue={data.basic_info.place_of_birth}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Place of Birth"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Education :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.education"
              defaultValue={data.basic_info.education}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Education"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Language :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.language"
              defaultValue={data.basic_info.language}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Language"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Marital Status :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.marital_status"
              defaultValue={data.basic_info.marital_status}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Marital Status"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Children :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.children"
              defaultValue={data.basic_info.children}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Children"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Business :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.business"
              defaultValue={data.basic_info.business}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Business"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Hobby :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.hobby"
              defaultValue={data.basic_info.hobby}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Hobby"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Foreign Migration :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.foreign_migration"
              defaultValue={data.basic_info.foreign_migration}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Foreign Migration"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Address :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.address"
              defaultValue={data.basic_info.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter address"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Mobile Number :
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="basic_info.mobile_number"
              defaultValue={data.basic_info.mobile_number}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Mobile Number"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
            Edit Email Address :
          </label>
          <div className="col-sm-8">
            <input
              type="email"
              name="basic_info.email"
              defaultValue={data.basic_info.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Email Address"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Basicinformation;
