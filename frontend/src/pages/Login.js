import React, { useState } from 'react';

const Login = ({ onAuthSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setOtpSent(true);
          alert('OTP sent successfully!');
        } else {
          alert(data.error || 'Failed to send OTP.');
        }
      })
      .catch((error) => alert(`Error sending OTP: ${error.message}`));
  };

  const handleVerifyOtp = () => {
    fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, otp }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          onAuthSuccess(data.token); // Pass the token to the parent or save it
        } else {
          alert(data.error || 'Invalid OTP.');
        }
      })
      .catch(() => alert('Error verifying OTP.'));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {!otpSent ? (
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            className="w-full p-2 border rounded mb-4"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
          />
          <button
            onClick={handleSendOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium">Enter OTP</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
