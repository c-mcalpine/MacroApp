import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import PhoneNumberSignIn from './PhoneNumberSignIn'; // Component for phone sign-in

const Auth = ({ onAuthSuccess }) => {
  const [isPhoneSignIn, setIsPhoneSignIn] = useState(false);

  const handleGoogleSuccess = (credentialResponse) => {
    // Send Google token to the backend
    fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          onAuthSuccess(data.token); // Pass the token to the parent component
        } else {
          alert('Google Sign-In failed.');
        }
      })
      .catch((error) => {
        alert('Google Sign-In failed.');
        console.error(error);
      });
  };

  const handleGoogleFailure = () => {
    alert('Google Sign-In failed.');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>

        {!isPhoneSignIn ? (
          <div className="space-y-4">
            {/* Google Sign-In Button */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />

            <button
              onClick={() => setIsPhoneSignIn(true)}
              className="bg-gray-300 text-black px-4 py-2 rounded w-full"
            >
              Sign in with Phone Number
            </button>
          </div>
        ) : (
          <PhoneNumberSignIn onSuccess={onAuthSuccess} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;
