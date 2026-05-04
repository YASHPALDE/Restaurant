import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, List, User, LogOut, LayoutDashboard, QrCode } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const adminActions = [
    { 
      title: 'Add Menu Item', 
      icon: <PlusCircle size={32} />, 
      path: '/admin/menu/add', 
      desc: 'Create new dishes for your restaurant' 
    },
    { 
      title: 'View/Edit Menu', 
      icon: <List size={32} />, 
      path: '/admin/menu', 
      desc: 'Manage existing menu items' 
    },
    { 
      title: 'Restaurant Profile', 
      icon: <User size={32} />, 
      path: '/admin/profile', 
      desc: 'Update your restaurant details' 
    },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar glass">
        <div className="sidebar-logo">
          <LayoutDashboard color="#ff4d00" />
          <span>Savory Admin</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active"><LayoutDashboard size={20} /> Dashboard</button>
          <button className="nav-item" onClick={() => navigate('/admin/menu/add')}><PlusCircle size={20} /> Add Menu</button>
          <button className="nav-item" onClick={() => navigate('/admin/menu')}><List size={20} /> View Menu</button>
          <button className="logout-btn" onClick={handleLogout}><LogOut size={20} /> Logout</button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header container">
          <div className="header-info">
            <h1>Welcome back, <span className="highlight">{username}</span></h1>
            <p>Here's what's happening with your restaurant today.</p>
          </div>
        </header>

        <section className="dashboard-grid container">
          {adminActions.map((action, index) => (
            <div 
              key={index} 
              className="action-card glass fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(action.path)}
            >
              <div className="action-icon">{action.icon}</div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.desc}</p>
              </div>
            </div>
          ))}
          
          <div className="action-card glass fade-in special" style={{ animationDelay: '0.3s' }} onClick={() => navigate('/admin/menu')}>
            <div className="action-icon"><QrCode size={32} /></div>
            <div className="action-content">
              <h3>QR Management</h3>
              <p>Generate and download your restaurant QR code</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
