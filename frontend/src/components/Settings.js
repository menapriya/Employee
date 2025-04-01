import React from "react";

const Settings = () => {
  return (
    <div className="content">
      <h1>Settings</h1>
      <p>Manage your account settings here.</p>

      <div>
        <label>Change Password:</label>
        <input type="password" placeholder="New Password" />
      </div>

      <div>
        <label>Notification Preferences:</label>
        <select>
          <option>Email Notifications</option>
          <option>Push Notifications</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
