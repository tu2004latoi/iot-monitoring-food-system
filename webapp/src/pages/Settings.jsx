import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [form, setForm] = useState({
    username: "admin",
    email: "admin@example.com",
    theme: "light",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    alert("Cài đặt đã được lưu!");
    // Có thể gửi form lên server ở đây
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Cài đặt</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <label>
          Tên người dùng:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Giao diện:
          <select name="theme" value={form.theme} onChange={handleChange}>
            <option value="light">🌞 Sáng</option>
            <option value="dark">🌙 Tối</option>
          </select>
        </label>

        <label>
          Mật khẩu mới:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Để trống nếu không thay đổi"
          />
        </label>

        <label>
          Xác nhận mật khẩu:
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="save-btn">💾 Lưu thay đổi</button>
      </form>
    </div>
  );
};

export default Settings;
