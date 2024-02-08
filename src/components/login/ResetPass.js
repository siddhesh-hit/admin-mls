import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../images/logo.svg";
import { postApi } from "../../services/axiosInterceptors";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = async () => {
    if (password !== passwordInput) {
      console.log("as");
      return;
    }

    const email = decodeURIComponent(location.search.split("=")[1]);
    if (email) {
      await postApi("user/reset", {
        email,
        password,
      })
        .then((res) => {
          if (res.data.success) {
            navigate(`/`);
            toast.success("Password updated!");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to update the password!");
        });
    }
  };

  return (
    <div className="container-fluid loginboxpage" style={{ height: "100vh" }}>
      <Link to="/">
        <img src={logo} alt="logo" className="loginbg" />
      </Link>
      <div className="container ">
        <Row className="justify-content-center">
          <Col lg={6} md={6} sm={12} xs={12}>
            <div className="login-boxs">
              <h3 className="mb-3">Reset password</h3>
              <p className="rest_pass">
                Enter your email address to <br />
                reset your password
              </p>
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </InputGroup.Text>
                <Form.Control
                  type={passwordType === "password" ? "password" : "text"}
                  placeholder="Enter the password"
                  name="password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </InputGroup.Text>
                <Form.Control
                  type={passwordType === "password" ? "password" : "text"}
                  placeholder="Enter the password again"
                  name="password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  defaultValue={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <div className="input-group-btn">
                  <span onClick={togglePassword}>
                    {passwordType === "password" ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </span>
                </div>
              </InputGroup>
              <Button variant="primary" className="mt-4" onClick={handleSubmit}>
                Confirm
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ResetPassword;
