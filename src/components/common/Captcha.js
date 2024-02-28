import React, { useEffect, useState, useRef } from "react";

const Captcha = ({ getIsCurrent }) => {
  const canvasRef = useRef(null);

  const generateOTP = () => {
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = lowercaseLetters.toUpperCase();
    const numbers = "0123456789";
    const characters = lowercaseLetters + uppercaseLetters + numbers;

    let otp = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters[randomIndex];
    }

    return otp;
  };

  const [otp, setOtp] = useState(generateOTP());
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleVerification = () => {
    setIsCorrect(otp === userInput);
  };

  const handleRefresh = () => {
    setOtp(generateOTP());
    setUserInput("");
    setIsCorrect(false);
  };

  const drawOTP = (otpText) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillText(otpText, 10, 40);
  };

  useEffect(() => {
    drawOTP(otp);
    handleVerification();
  }, [userInput]);

  useEffect(() => {
    drawOTP(otp);
  }, [handleRefresh]);

  useEffect(() => {
    getIsCurrent(isCorrect);
  }, [isCorrect]);

  return (
    <div className="captcha-container">
      {/* <p>Captcha:</p> */}
      <div className="d-flex" style={{ flexFlow: "column" }}>
        <canvas ref={canvasRef} width="500" height="50"></canvas>
        <div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter Captcha"
          />
          <span
            style={{
              cursor: "pointer",
              marginLeft: "10px",
              padding: "2px 3px",
              textAlign: "center",
              border: "1px solid black",
            }}
            onClick={handleRefresh}
          >
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Captcha;
