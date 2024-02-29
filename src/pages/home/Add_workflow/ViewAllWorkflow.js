import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import add from "../../../images/add.svg";
import history from "../../../images/history.svg";

import { getApi } from "../../../services/axiosInterceptors";
import { newPageName } from "../../../data/fileName";

const ViewAllFaqs = () => {
  const [data, setData] = useState({
    create: [],
    update: [],
    delete: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      await getApi(`pending?isPending=${true}&action=Create`)
        .then((res) => {
          setData((prev) => ({
            ...prev,
            create: res.data.data,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi(`pending?isPending=${true}&action=Update`)
        .then((res) => {
          setData((prev) => ({
            ...prev,
            update: res.data.data,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      await getApi(`pending?isPending=${true}&action=Delete`)
        .then((res) => {
          setData((prev) => ({
            ...prev,
            delete: res.data.data,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link to="/ViewWorkflowHistory" className="addpagess">
            <img src={history} alt="history" />
            Workflow history
          </Link>
          <h4 className="page-title">• View All CREATE Workflow</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Action</th>
                      <th>Model Name</th>
                      <th>View</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data?.create && data?.create?.length > 0 ? (
                      data?.create.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{index + 1}</h4>
                          </td>
                          <td>{item?.action}</td>
                          <td>{item?.modelName}</td>
                          <td>
                            {/* {item?.modelName === "MandalGallery" ? (
                              <Link
                                to={`https://mlsapi.sblcorp.com/images/mandal/${item?.modelId}`}
                              >
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => (
                                    <Tooltip {...props}>View the data.</Tooltip>
                                  )}
                                  placement="bottom"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </OverlayTrigger>
                              </Link>
                            ) : ( */}
                            <Link
                              to={`/${newPageName[item?.modelName]}?id=${
                                item._id
                              }&action=${item.action}`}
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </Link>
                            {/* )} */}
                          </td>
                          <td>
                            <Link
                              to={`/EditWorkflow?id=${item._id}&action=${item.action}`}
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-edit"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="contentofpages">
          <h4 className="page-title">• View All UPDATE Workflow</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Action</th>
                      <th>Model Name</th>
                      <th>View</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data?.update && data?.update?.length > 0 ? (
                      data?.update.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{index + 1}</h4>
                          </td>
                          <td>{item?.action}</td>
                          <td>{item?.modelName}</td>
                          <td>
                            {/* {item?.modelName === "MandalGallery" ? (
                              <Link
                                to={`https://mlsapi.sblcorp.com/images/mandal/${item?.data_object}`}
                              >
                                <OverlayTrigger
                                  delay={{ hide: 450, show: 300 }}
                                  overlay={(props) => (
                                    <Tooltip {...props}>View the data.</Tooltip>
                                  )}
                                  placement="bottom"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </OverlayTrigger>
                              </Link>
                            ) : ( */}
                            <Link
                              to={`/${newPageName[item?.modelName]}?id=${
                                item._id
                              }&action=${item.action}`}
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </Link>
                            {/* )} */}
                          </td>
                          <td>
                            <Link
                              to={`/EditWorkflow?id=${item._id}&action=${item.action}`}
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-edit"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="contentofpages">
          <h4 className="page-title">• View All DELETE Workflow</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Action</th>
                      <th>Model Name</th>
                      <th>View</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data?.delete && data?.delete?.length > 0 ? (
                      data?.delete.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{index + 1}</h4>
                          </td>
                          <td>{item?.action}</td>
                          <td>{item?.modelName}</td>
                          <td>
                            <Link
                              to={`/${newPageName[item?.modelName]}?id=${
                                item._id
                              }&action=${item.action}`}
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>View the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/EditWorkflow?id=${item._id}&action=${item.action}`}
                            >
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-edit"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewAllFaqs;
