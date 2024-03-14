import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import Paginate from "../../../components/common/Paginate";
import TotalEntries from "../../../table/TotalEntries";
import add from "../../../images/add.svg";

import { deleteApi, getApi } from "../../../services/axiosInterceptors";

const ViewContent = () => {
  const [data, setData] = useState([]);
  const [pageOptions, setPageOptions] = useState({
    current: 0,
    page: 10,
    count: 0,
    ministry_name: "",
  });

  const fetchData = async () => {
    await getApi(
      `ministry?perPage=${pageOptions.current}&perLimit=${pageOptions.page}&ministry_name=${pageOptions.ministry_name}`
    )
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setPageOptions((prev) => ({
            ...prev,
            count: res.data.count,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?") === true) {
      await deleteApi("ministry", id)
        .then((res) => {
          if (res.status === 204) {
            toast.success("Deleted the ministry.");
            fetchData();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the ministry.");
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageOptions.page, pageOptions.current, pageOptions.ministry_name]);

  return (
    <div className="content-wrapper pt-4">
      <div className="contentofpages">
        <Link to="/AddMinistry" className="addpagess">
          <img src={add} alt="add" />
          Add Ministry
        </Link>

        <h4 className="page-title">• View Ministry</h4>
        <TotalEntries
          returnCount={(data) =>
            setPageOptions((prev) => ({
              ...prev,
              page: data,
            }))
          }
          returnSearch={(data) =>
            setPageOptions((prev) => ({
              ...prev,
              ministry_name: data,
            }))
          }
        />

        <div className="card card-info">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                <thead>
                  <tr>
                    <th>Ministry Name</th>
                    <th>Minister</th>
                    <th>Year</th>
                    <th>Sub Ministry</th>
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
                            <h4>{item.ministry_name}</h4>
                          </td>
                          <td>
                            <h4>{item.minister}</h4>
                          </td>
                          <td>
                            <h4>{item.year}</h4>
                          </td>
                          <td>
                            <h4>
                              {item?.sub_ministry.map((it, i, arr) => (
                                <span>
                                  {it.name}
                                  {i !== arr?.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            </h4>
                          </td>
                          <td>
                            <Link to={`/EditMinistry?id=${item._id}`}>
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
              {pageOptions.count > 0 && (
                <Paginate
                  totalCount={pageOptions.count}
                  perPage={pageOptions.page}
                  handlePageChange={(currentPage) => {
                    setPageOptions((prev) => ({
                      ...prev,
                      current: currentPage,
                    }));
                  }}
                  initialPage={pageOptions.current}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;
