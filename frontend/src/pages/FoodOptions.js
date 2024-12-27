import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import apiClient from '../utils/api';

const FoodOptions = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    apiClient.get('/restaurants')
      .then((response) => setOptions(response.data))
      .catch((error) => console.error('Error fetching food options:', error));
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {options.map((option) => (
        <Card
          key={option.id}
          title={option.name}
          description={option.address}
          image={option.image || 'https://via.placeholder.com/150'}
          onClick={() => console.log(`Clicked ${option.name}`)}
        />
      ))}
    </div>
  );
};

export default FoodOptions;
