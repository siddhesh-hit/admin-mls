import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import Footer from "../../../components/common/Footer";
import { auth } from "../../../data/RouteStructure";
import { useState } from "react";
import { getApi } from "../../../services/axiosInterceptors";

const UserRole = () => {
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.checked);
  };
  const fetchData = async (role) => {
    await getApi(`user/roletask/query?role=${role}`)
      .then((res) => setRoles(res.data.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <div className="panell">Role Based User Access Management System</div>
          <div className="usetype">
            <h3>• User Type</h3>
            <select
              className="form-control"
              defaultValue={role}
              onChange={(e) => {
                setRole(e.target.value);
                setRoles([]);
                fetchData(e.target.value);
              }}
            >
              <option hidden>Select a role type</option>
              {auth.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <table className="table table-striped table-bordered mb-0 mt-5 view_vidhan_mandal">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Authorities</th>
                  <th>Create</th>
                  <th>View</th>
                  <th>Update</th>
                  <th>Delete</th>
                  <th>User</th>
                  <th>Download</th>
                  <th>Upload</th>
                </tr>
              </thead>
              <tbody>
                {roles?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <h4>{item.userId.full_name}</h4>
                    </td>
                    <td>
                      <p>{item.role}</p>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="create"
                          onChange={handleChange}
                          defaultChecked={item?.permission?.includes("create")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="read"
                          onChange={handleChange}
                          defaultChecked={item?.permission?.includes("read")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="update"
                          onChange={handleChange}
                          defaultChecked={item?.permission?.includes("update")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="delete"
                          onChange={handleChange}
                          defaultChecked={item?.permission?.includes("delete")}
                        />
                      </div>
                    </td>

                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="user"
                          onChange={handleChange}
                          defaultChecked={item?.permission?.includes("user")}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="download"
                          onChange={handleChange}
                          defaultChecked={item?.permission?.includes(
                            "download"
                          )}
                        />
                      </div>
                    </td>
                    <td className="markyesorno">
                      <div>
                        <input
                          type="checkbox"
                          name="upload"
                          onChange={handleChange}
                          defaultChecked={item?.permission?.includes("upload")}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserRole;
