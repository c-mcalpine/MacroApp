import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import Recommendations from '../components/Recommendations';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch restaurant data
    fetch('http://127.0.0.1:5000/api/restaurants')
      .then((res) => res.json())
      .then((data) => setRestaurants(data));

    // Fetch meal recommendations
    fetch('http://127.0.0.1:5000/api/menu-meals')
      .then((res) => res.json())
      .then((data) =>
        setRecommendations(
          data.map((meal) => ({
            name: meal, // Meal name
            description: `Customize your own delicious ${meal}!`, // Placeholder description
            imageUrl: '/images/burritobowl.jpg', // Placeholder image URL
          }))
        )
      )
      .catch((err) => console.error('Error fetching recommendations:', err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Find your next meal with Macro</h1>
      <div className="mb-8">
        <Map restaurants={restaurants} />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Recommended Meals</h2>
      <Recommendations meals={recommendations} />
    </div>
  );
};

export default Home;
