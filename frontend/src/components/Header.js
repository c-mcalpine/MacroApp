import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    window.location.href = '/';
  };

  return (
    <header className="bg-slate-950 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold" style={{ fontFamily: 'Lexend, sans-serif' }}>macro</h1>
        <nav className="space-x-4" style={{ fontFamily: 'Lexend, sans-serif' }}>
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          {!isLoggedIn ? (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
