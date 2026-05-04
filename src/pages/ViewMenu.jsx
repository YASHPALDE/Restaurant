import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { 
  ChevronLeft, 
  Search, 
  Edit2, 
  Trash2, 
  QrCode, 
  Plus, 
  Download,
  Filter
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import './ViewMenu.css';

const ViewMenu = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showQR, setShowQR] = useState(false);
  
  const restaurantId = localStorage.getItem('restaurant_id');
  const menuUrl = `${window.location.origin}/menu/${restaurantId}`;

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await api.get('admin/menu/');
      setItems(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`admin/menu/${id}/`);
        setItems(items.filter(item => item.id !== id));
      } catch (err) {
        alert('Failed to delete item');
      }
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code-canvas');
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "restaurant-qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="view-menu-page container">
      <div className="view-menu-header">
        <button className="back-btn" onClick={() => navigate('/admin')}>
          <ChevronLeft size={20} /> Back
        </button>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setShowQR(true)}>
            <QrCode size={18} /> Generate QR
          </button>
          <button className="btn-primary" onClick={() => navigate('/admin/menu/add')}>
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      <div className="menu-controls glass">
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search dishes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="drinks">Drinks</option>
            <option value="desserts">Desserts</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading your menu...</div>
      ) : (
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card glass fade-in">
              <div className="card-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <span className={`category-tag ${item.category}`}>{item.category}</span>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <span className="price">${item.price}</span>
                </div>
                <p>{item.description}</p>
                <div className="card-actions">
                  <button className="edit-btn"><Edit2 size={16} /></button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showQR && (
        <div className="qr-modal-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal glass" onClick={e => e.stopPropagation()}>
            <h3>Restaurant QR Code</h3>
            <p>Scan this to view the digital menu</p>
            <div className="qr-container">
              <QRCodeCanvas 
                id="qr-code-canvas"
                value={menuUrl} 
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="qr-url">{menuUrl}</div>
            <div className="modal-btns">
              <button className="btn-primary" onClick={downloadQR}>
                <Download size={18} /> Download PNG
              </button>
              <button className="btn-secondary" onClick={() => setShowQR(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMenu;
