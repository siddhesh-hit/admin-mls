import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";

import { getApi, deleteApi } from "../../../services/axiosInterceptors";

const ViewAllHelpdesk = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await getApi("helpdesk")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      await deleteApi("helpdesk", id)
        .then(() => {
          toast.success("Helpdesk deleted successfully.");
          fetchData();
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <h4 className="page-title">• View All Helpdesk</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.length > 0 ? (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{index + 1}</h4>
                          </td>
                          <td>{item.isActive ? "Active" : "Inactive"}</td>
                          <td>
                            <Link to={`/View_helpdesk?id=${item._id}`}>
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
                            <Link to={`/Edit_helpdesk?id=${item._id}`}>
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
                          <td>
                            <div onClick={() => handleDelete(item._id)}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Delete the data.</Tooltip>
                                )}
                                placement="bottom"
                              >
                                <i className="fa fa-trash"></i>
                              </OverlayTrigger>
                            </div>
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

export default ViewAllHelpdesk;
