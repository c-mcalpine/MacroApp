import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const Recommendations = ({ meals }) => {
  const navigate = useNavigate();

  const handleMealClick = (mealName) => {
    navigate(`/customize/${mealName}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals.map((meal, index) => (
        <Card
          key={index}
          title={meal.name}
          description={meal.description || `Try our delicious ${meal.name}!`}
          image={meal.imageUrl || '/images/burritobowl.jpg'}
          onClick={() => handleMealClick(meal.name)}
        />
      ))}
    </div>
  );
};

export default Recommendations;
