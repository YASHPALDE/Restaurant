import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ChevronLeft, Image as ImageIcon, Plus, Loader2 } from 'lucide-react';
import './Form.css';

const AddMenu = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'veg',
    image: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await api.post('admin/menu/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin/menu');
    } catch (err) {
      console.error(err);
      alert('Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page container">
      <button className="back-btn" onClick={() => navigate('/admin')}>
        <ChevronLeft size={20} /> Back to Dashboard
      </button>

      <div className="form-card glass fade-in">
        <div className="form-header">
          <h2>Add New Dish</h2>
          <p>Fill in the details to add a new item to your digital menu</p>
        </div>

        <form onSubmit={handleSubmit} className="menu-form">
          <div className="form-grid">
            <div className="form-left">
              <div className="input-field">
                <label>Dish Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Truffle Mushroom Pasta" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="input-field">
                <label>Price ($)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  required 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div className="input-field">
                <label>Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                  <option value="drinks">Drinks</option>
                  <option value="desserts">Desserts</option>
                </select>
              </div>
            </div>

            <div className="form-right">
              <div className="image-upload-container">
                <label>Dish Image</label>
                <div className="image-preview-box" onClick={() => document.getElementById('image-input').click()}>
                  {preview ? (
                    <img src={preview} alt="Preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <ImageIcon size={40} />
                      <span>Click to upload image</span>
                    </div>
                  )}
                </div>
                <input 
                  id="image-input"
                  type="file" 
                  hidden 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <div className="input-field full-width">
            <label>Description</label>
            <textarea 
              placeholder="Tell your customers about this dish..." 
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="btn-primary submit-btn" disabled={loading}>
            {loading ? <Loader2 className="spinner" size={20} /> : <><Plus size={20} /> Add to Menu</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
