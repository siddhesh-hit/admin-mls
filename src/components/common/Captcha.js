import React, { useEffect, useState } from "react";

const Captcha = () => {
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
    setIsCorrect(false); // reset verification status
  };

  console.log(isCorrect);

  useEffect(() => {
    handleVerification();
  }, [userInput]);

  return (
    <div className="captcha-container">
      <p>Captcha:</p>
      <div className="d-flex" style={{ flexFlow: "column" }}>
        <span className="captcha-text">{otp}</span>
        <div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter Captcha"
          />
          <button onClick={handleRefresh}>
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="mb-3 d-flex align-items-center">
        <canvas id="captcha" width="200" height="80">
          {otp}
        </canvas>
        <button type="button" class="btn btn-secondary" id="refresh-captcha">
          <i class="fa fa-refresh"></i>
        </button>
      </div>
    </div>
  );
};

export default Captcha;
