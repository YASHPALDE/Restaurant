import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, ArrowRight, Star, Clock, Shield } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div className="hero-badge fade-in">
            <Star size={16} fill="#d4af37" color="#d4af37" />
            <span>Premium Experience</span>
          </div>
          <h1 className="fade-in" style={{ animationDelay: '0.2s' }}>
            Welcome to <span className="highlight">Savory QR</span> 🍽️
          </h1>
          <p className="fade-in" style={{ animationDelay: '0.4s' }}>
            Explore our delicious menu instantly. Scan, Choose, and Enjoy the finest culinary creations with a modern touch.
          </p>
          <div className="hero-btns fade-in" style={{ animationDelay: '0.6s' }}>
            <button className="btn-primary" onClick={() => navigate('/admin')}>
              Admin Dashboard <ArrowRight size={20} />
            </button>
            <button className="btn-secondary">
              View Sample Menu
            </button>
          </div>
        </div>
      </header>

      <section className="features container">
        <div className="feature-card glass fade-in">
          <div className="feature-icon"><Utensils size={32} /></div>
          <h3>Digital Menu</h3>
          <p>Easily manage your dishes with images, descriptions, and pricing in real-time.</p>
        </div>
        <div className="feature-card glass fade-in">
          <div className="feature-icon"><Clock size={32} /></div>
          <h3>Instant Access</h3>
          <p>Customers can view the menu instantly by scanning a unique QR code.</p>
        </div>
        <div className="feature-card glass fade-in">
          <div className="feature-icon"><Shield size={32} /></div>
          <h3>Secure & Reliable</h3>
          <p>Full control over your restaurant data with secure admin authentication.</p>
        </div>
      </section>

      <footer className="footer container">
        <p>&copy; 2026 Savory QR. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
