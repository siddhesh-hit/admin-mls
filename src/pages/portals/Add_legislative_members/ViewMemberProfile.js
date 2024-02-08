import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";

import { getApiById } from "../../../services/axiosInterceptors";
import { API } from "../../../config/api";
const ViewMemberProfile = () => {
  const [data, setData] = useState({});

  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("member", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• Legislative Member Profile</h4>
          <div className="card card-info">
            <div className="viewmemberprofile">
              <ul
                className="nav nav-tabs"
                id="custom-tabs-one-tab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="custom-tabs-one-home-tab"
                    data-toggle="pill"
                    href="#custom-tabs-one-home"
                    role="tab"
                    aria-controls="custom-tabs-one-home"
                    aria-selected="true"
                  >
                    Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="custom-tabs-one-profile-tab"
                    data-toggle="pill"
                    href="#custom-tabs-one-profile"
                    role="tab"
                    aria-controls="custom-tabs-one-profile"
                    aria-selected="false"
                  >
                    Political Journey
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="custom-tabs-one-election-tab"
                    data-toggle="pill"
                    href="#custom-tabs-one-election"
                    role="tab"
                    aria-controls="custom-tabs-one-election"
                    aria-selected="false"
                  >
                    Election Data
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content" id="custom-tabs-one-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="custom-tabs-one-home"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-one-home-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 text-center">
                      {data && data.basic_info && (
                        <img
                          src={
                            API.baseUrl +
                            data.basic_info.profile.destination +
                            "/" +
                            data.basic_info.profile.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}
                      <h4 className="membername">
                        {data &&
                          data.basic_info &&
                          data.basic_info.surname + " " + data.basic_info.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      <div className="ssss">
                        {data && data.basic_info && (
                          <div>
                            <p>
                              <b>Date of Birth :</b>
                              {data.basic_info.date_of_birth}
                            </p>
                            <p>
                              <b>Place of Birth :</b>
                              {data.basic_info.place_of_birth}
                            </p>
                            <p>
                              <b>Educational Qualification :</b>
                              {data.basic_info.education}
                            </p>
                            <p>
                              <b>Known Languages :</b>
                              {data.basic_info.language}
                            </p>
                            <p>
                              <b>Marital Status :</b>
                              {data.basic_info.marital_status}
                            </p>
                            <p>
                              <b>Children :</b> {data.basic_info.children}
                            </p>
                            <p>
                              <b>Business :</b> {data.basic_info.business}
                            </p>
                            <p>
                              <b>Party :</b> {data.basic_info.party}
                            </p>
                            <p>
                              <b>Constituency :</b>
                              {data.basic_info.constituency}
                            </p>
                            <p>
                              <b>Hobby :</b> {data.basic_info.hobby}
                            </p>
                            <p>
                              <b>Foreign Migration :</b>
                              {data.basic_info.foreign_migration}
                            </p>
                            <p>
                              <b>Gender :</b> {data.basic_info.gender}
                            </p>
                            <p>
                              <b>Address :</b> {data.basic_info.address}
                            </p>
                            <p>
                              <b>Mobile Number :</b>
                              {data.basic_info.mobile_number}
                            </p>
                            <p>
                              <b>Email Address :</b>
                              {data.basic_info.email}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="custom-tabs-one-profile"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-one-profile-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 text-center">
                      {data && data.basic_info && (
                        <img
                          src={
                            API.baseUrl +
                            data.basic_info.profile.destination +
                            "/" +
                            data.basic_info.profile.filename
                          }
                          alt="profilebg"
                          className="profilebg"
                        />
                      )}

                      <h4 className="membername">
                        {data &&
                          data.basic_info &&
                          data.basic_info.surname + " " + data.basic_info.name}
                      </h4>
                    </div>
                    <div className="col-lg-6">
                      {data && data.political_journey && (
                        <ul className="timeline timeline-split">
                          {data.political_journey.map((item, index) => (
                            <li className="timeline-item" key={index}>
                              <div className="timeline-marker" />
                              <div className="timeline-content">
                                <h3 className="timeline-title">{item.date}</h3>
                                <p>{item.title}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="custom-tabs-one-election"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-one-election-tab"
                >
                  {data && data.election_data && (
                    <>
                      <div className="col-lg-12">
                        <h4 className="eclecresult">Election Result</h4>
                        <h3 className="gondiaa">
                          {data.election_data.constituency}
                        </h3>
                        <div className="row votes_abcdss">
                          <div className="col-lg-5">
                            <h3>
                              • Total Electorate :
                              {data.election_data.total_electorate}
                            </h3>
                          </div>
                          <div className="col-lg-5">
                            <h3>
                              • Total valid voting :{" "}
                              {data.election_data.total_valid_voting}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                        <thead>
                          <tr>
                            <th>Sr.No</th>
                            <th>Candidate Name</th>
                            <th>Votes</th>
                            <th>Party</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.election_data.member_election_result.map(
                            (item, index) => (
                              <tr key={index}>
                                <td>
                                  <h4>{index + 1}</h4>
                                </td>
                                <td>
                                  <h4>{item.candidate_name}</h4>
                                </td>
                                <td>
                                  <h4>{item.votes}</h4>
                                </td>
                                <td>
                                  <h4>{item.party}</h4>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewMemberProfile;
