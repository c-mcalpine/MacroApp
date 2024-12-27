import React from 'react';
import Card from './Card';

const Recommendations = ({ meals }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals.map((meal) => (
        <Card
          key={meal.id}
          title={meal.name}
          description={meal.description}
          image={meal.imageUrl}
          onClick={() => console.log(`View details for ${meal.name}`)}
        />
      ))}
    </div>
  );
};

export default Recommendations;
