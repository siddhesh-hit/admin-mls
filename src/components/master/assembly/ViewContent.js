import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import add from "../../../images/add.svg";

import { deleteApi, getApi } from "../../../services/axiosInterceptors";

const ViewContent = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    await getApi("assembly")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?") === true) {
      console.log("cehck");
      await deleteApi("assembly", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the assembly.");
            setTimeout(() => {
              navigate("/ViewAssembly");
              fetchData();
            }, 1100);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the assembly.");
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddAssembly" className="addpagess">
          <img src={add} alt="add" />
          Add Assembly
        </Link>

        <h4 className="page-title">• View Assembly</h4>
        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Assembly Number</th>
                    <th>Assembly Number (Marathi)</th>
                    <th>Assembly Name</th>
                    <th>Assembly Name (Marathi)</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    <>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <h4>{item.english.assembly_number}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.assembly_number}</h4>
                          </td>
                          <td>
                            <h4>{item.english.assembly_name}</h4>
                          </td>
                          <td>
                            <h4>{item.marathi.assembly_name}</h4>
                          </td>
                          <td>
                            <h4>{item.start_date}</h4>
                          </td>
                          <td>
                            <h4>{item.end_date}</h4>
                          </td>
                          <td>
                            <Link to={`/EditAssembly?id=${item._id}`}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Edit the data.</Tooltip>
                                )}
                                placement="top"
                              >
                                <i className="fa fa-edit"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                          <td>
                            <Link onClick={() => handleDelete(item._id)}>
                              <OverlayTrigger
                                delay={{ hide: 450, show: 300 }}
                                overlay={(props) => (
                                  <Tooltip {...props}>Delete the data.</Tooltip>
                                )}
                                placement="top"
                              >
                                <i className="fa fa-trash"></i>
                              </OverlayTrigger>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </>
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
  );
};

export default ViewContent;
