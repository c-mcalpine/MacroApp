import React, { useState } from 'react';

const PhoneNumberSignIn = ({ onSuccess }) => {
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
      .catch(() => alert('Error sending OTP.'));
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
          onSuccess(data.token); // Pass token to parent
        } else {
          alert(data.error || 'Invalid OTP.');
        }
      })
      .catch(() => alert('Error verifying OTP.'));
  };

  return (
    <div>
      {!otpSent ? (
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            className="w-full p-2 border rounded mb-4"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            onClick={handleSendOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded"
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
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberSignIn;
