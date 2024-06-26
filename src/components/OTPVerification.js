import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/verify-otp', { otp });
      if (response.data.success) {
        navigate('/dashboard');
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      alert('Error verifying OTP');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default OTPVerification;
