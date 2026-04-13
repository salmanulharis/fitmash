import React from 'react';
import "./style.css";

const Dashboard = () => {
  return (
    <div className="main-content dashboard">
      <div className="content-header">
        <h2>Dashboard</h2>
      </div>
      <div className="content-body">
        <p>Welcome to the Fitmash Admin Dashboard! Here you can manage your gym's operations, view analytics, and configure settings. Use the navigation menu on the left to access different sections of the dashboard.</p>
        <p>Get started by exploring the various features and tools available to help you run your gym efficiently.</p>
      </div>
      <div className="content-footer">
        <p>&copy; 2024 Fitmash. All rights reserved.</p>
      </div>
    </div>
  );
}
export default Dashboard;