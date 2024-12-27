import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-96">
          {children}
          <button
            className="bg-red-600 text-white px-4 py-2 mt-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  