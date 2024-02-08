import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";

import logo from "../../images/logo.svg";
import { postApi } from "../../services/axiosInterceptors";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const validateEmail = () => {
    // Basic email validation regex pattern
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email.match(emailPattern)) {
      setValidationMessage("Please enter a valid email address.");
    } else {
      setValidationMessage(false);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    await postApi("user/forgot", { email })
      .then((res) => {
        if (res.data.success) {
          navigate(`/ResetPassword?id=${encodeURIComponent(email)}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid loginboxpage" style={{ height: "100vh" }}>
      <img src={logo} alt="logo" className="loginbg" />
      <div className="container ">
        <Row className="justify-content-center">
          <Col lg={6} md={6} sm={12} xs={12}>
            <div className="login-boxs">
              <h3 className="mb-4">Forgot your password?</h3>
              <p className="rest_pass">
                Enter your email address to <br />
                reset your password
              </p>
              <InputGroup className="mb-4">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email ID"
                  aria-label="Email ID"
                  aria-describedby="basic-addon1"
                  defaultValue={email}
                  onChange={handleEmailChange}
                />
              </InputGroup>
              {validationMessage && (
                <p className="error">{validationMessage}</p>
              )}
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
              <Link to="/Login" className="new_account">
                Click here to login
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgetPassword;
