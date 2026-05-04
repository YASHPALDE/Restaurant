import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ChevronLeft, Store, Save, Loader2 } from 'lucide-react';
import './Form.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('admin/profile/');
      setFormData({
        name: response.data.name,
        description: response.data.description || ''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('admin/profile/', formData);
      alert('Profile updated successfully!');
      navigate('/admin');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container" style={{padding: '40px'}}>Loading Profile...</div>;

  return (
    <div className="form-page container">
      <button className="back-btn" onClick={() => navigate('/admin')}>
        <ChevronLeft size={20} /> Back
      </button>

      <div className="form-card glass fade-in">
        <div className="form-header">
          <div className="auth-logo" style={{margin: '0 0 20px 0'}}>
            <Store size={32} color="#ff4d00" />
          </div>
          <h2>Restaurant Profile</h2>
          <p>Update your restaurant details shown to customers</p>
        </div>

        <form onSubmit={handleSubmit} className="menu-form">
          <div className="input-field full-width">
            <label>Restaurant Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="input-field full-width">
            <label>Tagline / Description</label>
            <textarea 
              placeholder="e.g. The finest Italian cuisine in the city" 
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="btn-primary submit-btn" disabled={saving}>
            {saving ? <Loader2 className="spinner" size={20} /> : <><Save size={20} /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
