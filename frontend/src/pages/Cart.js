import React, { useState } from 'react';
import Modal from '../components/Modal';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Salad Bowl', price: 12.99 },
    { id: 2, name: 'Grilled Chicken Wrap', price: 9.99 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
          <span>{item.name}</span>
          <span>${item.price.toFixed(2)}</span>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-6 py-2 mt-6 rounded"
      >
        Checkout
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold">Thank you for your order!</h2>
        <p>Your food is on the way.</p>
      </Modal>
    </div>
  );
};

export default Cart;
