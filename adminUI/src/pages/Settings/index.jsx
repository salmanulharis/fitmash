import React, { useState } from 'react';
import './style.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    allowSelfRegistration: true,
    maintenanceMode: false,
    emailNotifications: true,
    twoFactorAuth: false,
    autoPaymentRetry: true,
    dataBackup: false
  });

  const [savedMessage, setSavedMessage] = useState('');

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSavedMessage('');
  };

  const handleSaveChanges = () => {
    setSavedMessage('Changes saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
    console.log('Saved settings:', settings);
  };

  return (
    <div className="main-content settings-page">
      <div className="content-header settings-header">
        <h2>Platform Settings</h2>
      </div>

      <div className="content-body settings-body">
        {/* Global Features Section */}
        <div className="settings-section">
          <h3 className="section-title">Global Features</h3>
          
          <div className="settings-list">
            <div className="settings-item">
              <div className="settings-info">
                <h4>Allow Self-Registration</h4>
                <p>Gym owners can sign up without admin approval.</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="selfRegistration"
                  checked={settings.allowSelfRegistration}
                  onChange={() => handleToggle('allowSelfRegistration')}
                  className="toggle-checkbox"
                />
                <label htmlFor="selfRegistration" className="toggle-label">
                  <span className="toggle-inner"></span>
                </label>
              </div>
            </div>

            <div className="settings-item">
              <div className="settings-info">
                <h4>Maintenance Mode</h4>
                <p>Disable platform access for all tenants (shows maintenance page).</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={() => handleToggle('maintenanceMode')}
                  className="toggle-checkbox"
                />
                <label htmlFor="maintenanceMode" className="toggle-label">
                  <span className="toggle-inner"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* System Settings Section */}
        <div className="settings-section">
          <h3 className="section-title">System Settings</h3>
          
          <div className="settings-list">
            <div className="settings-item">
              <div className="settings-info">
                <h4>Email Notifications</h4>
                <p>Send email notifications for system alerts and updates.</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                  className="toggle-checkbox"
                />
                <label htmlFor="emailNotifications" className="toggle-label">
                  <span className="toggle-inner"></span>
                </label>
              </div>
            </div>

            <div className="settings-item">
              <div className="settings-info">
                <h4>Two-Factor Authentication</h4>
                <p>Require 2FA for all admin users.</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                  className="toggle-checkbox"
                />
                <label htmlFor="twoFactorAuth" className="toggle-label">
                  <span className="toggle-inner"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Settings Section */}
        <div className="settings-section">
          <h3 className="section-title">Payment Settings</h3>
          
          <div className="settings-list">
            <div className="settings-item">
              <div className="settings-info">
                <h4>Auto Payment Retry</h4>
                <p>Automatically retry failed payments after 24 hours.</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="autoPaymentRetry"
                  checked={settings.autoPaymentRetry}
                  onChange={() => handleToggle('autoPaymentRetry')}
                  className="toggle-checkbox"
                />
                <label htmlFor="autoPaymentRetry" className="toggle-label">
                  <span className="toggle-inner"></span>
                </label>
              </div>
            </div>

            <div className="settings-item">
              <div className="settings-info">
                <h4>Data Backup</h4>
                <p>Enable automatic daily backups of platform data.</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="dataBackup"
                  checked={settings.dataBackup}
                  onChange={() => handleToggle('dataBackup')}
                  className="toggle-checkbox"
                />
                <label htmlFor="dataBackup" className="toggle-label">
                  <span className="toggle-inner"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="settings-actions">
          {savedMessage && (
            <div className="success-message">
              ✓ {savedMessage}
            </div>
          )}
          <button 
            className="btn btn-save" 
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
