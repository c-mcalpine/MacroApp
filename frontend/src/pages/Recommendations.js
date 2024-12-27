import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import apiClient from '../utils/api';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    apiClient.get('/recommendations')
      .then((response) => setRecommendations(response.data))
      .catch((error) => console.error('Error fetching recommendations:', error));
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {recommendations.map((item) => (
        <Card
          key={item.id}
          title={item.name}
          description={item.details}
          image={item.image || 'https://via.placeholder.com/150'}
          onClick={() => console.log(`Clicked ${item.name}`)}
        />
      ))}
    </div>
  );
};

export default Recommendations;
