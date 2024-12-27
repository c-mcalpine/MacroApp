import React from 'react';

const Card = ({ title, description, image, onClick }) => {
    return (
      <div className="border rounded-lg shadow-md p-4">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded" />
        <h3 className="text-lg font-bold mt-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
          onClick={onClick}
        >
          View Details
        </button>
      </div>
    );
  };
  
  export default Card;
  