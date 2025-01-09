import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import FoodOptions from './pages/FoodOptions';
import Recommendations from './pages/Recommendations';
import CustomizeMeal from './pages/CustomizeMeal';
import Login from './pages/Login';

function App() {
  const handleAuthSuccess = (token) => {
    localStorage.setItem('token', token);
    alert('Login successful!');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/food-options" element={<FoodOptions />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/customize/:mealName" element={<CustomizeMeal />} />
            <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;