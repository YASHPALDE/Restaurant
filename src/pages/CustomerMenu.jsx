import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Utensils, Info, ShoppingBag } from 'lucide-react';
import './CustomerMenu.css';

const CustomerMenu = () => {
  const { restaurantId } = useParams();
  const [items, setItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchMenu();
  }, [restaurantId]);

  const fetchMenu = async () => {
    try {
      const [menuRes, restRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/public/menu/${restaurantId}/`),
        axios.get(`http://127.0.0.1:8000/api/public/restaurant/${restaurantId}/`)
      ]);
      setItems(menuRes.data);
      setRestaurant(restRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'veg', 'non-veg', 'drinks', 'desserts'];

  const filteredItems = items.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  if (loading) return <div className="customer-loading">Exploring Flavors...</div>;

  return (
    <div className="customer-menu">
      <header className="customer-header">
        <div className="header-bg"></div>
        <div className="header-content">
          <h1>{restaurant?.name || 'Welcome'}</h1>
          <p>{restaurant?.description || 'Enjoy our specially curated menu'}</p>
        </div>
      </header>

      <div className="category-tabs">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="customer-menu-list">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="dish-card fade-in">
              <div className="dish-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="no-dish-img"><Utensils size={32} /></div>
                )}
              </div>
              <div className="dish-info">
                <div className="dish-header">
                  <h3>{item.name}</h3>
                  <span className="dish-price">${item.price}</span>
                </div>
                <p>{item.description}</p>
                <div className="dish-footer">
                   <span className={`dish-type ${item.category}`}>{item.category}</span>
                   <button className="info-btn"><Info size={16} /></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-menu">No items found in this category.</div>
        )}
      </div>

      <div className="customer-fab">
        <ShoppingBag size={24} />
      </div>
    </div>
  );
};

export default CustomerMenu;
