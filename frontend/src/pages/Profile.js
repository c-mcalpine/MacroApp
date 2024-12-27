import React, { useState } from 'react';

const Profile = () => {
  const [preferences, setPreferences] = useState({
    dietary: 'Vegetarian',
    location: 'New York, NY',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <form className="space-y-4">
        <div>
          <label className="block font-bold">Dietary Preference</label>
          <input
            type="text"
            name="dietary"
            value={preferences.dietary}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block font-bold">Location</label>
          <input
            type="text"
            name="location"
            value={preferences.location}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
