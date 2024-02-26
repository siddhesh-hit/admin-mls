import { Link } from "react-router-dom";
import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import add from "../../../images/add.svg";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const ViewContact = () => {
  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <Link className="addpagess" to="/AddContact">
            <img src={add} alt="add" />
            Add Contact Us
          </Link>
          <h4 className="page-title">• View Contact Us</h4>
          <div className="card card-info">
            <div className="row">
              <div className="col-lg-12">
                <table className="table table-striped table-bordered mb-0 view_vidhan_mandal">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Fax Number</th>
                      <th>Legislature No</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h4>Library Department</h4>
                      </td>
                      <td>
                        <h4>ABC</h4>
                      </td>
                      <td>
                        <h4>Library</h4>
                      </td>
                      <td>
                        <h4>ABC</h4>
                      </td>
                      <td>
                        <Link to="/">
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>Delete the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </OverlayTrigger>
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <Link to="/EditContact">
                          <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>Edit the data.</Tooltip>
                            )}
                            placement="bottom"
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </OverlayTrigger>
                        </Link>
                      </td>
                    </tr>
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

export default ViewContact;
