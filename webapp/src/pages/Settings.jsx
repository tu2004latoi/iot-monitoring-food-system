import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
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
    // Thêm logic gửi dữ liệu lên server ở đây
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
            autoComplete="username"  // Thêm autocomplete
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"  // Thêm autocomplete
          />
        </label>

        <label>
          Mật khẩu mới:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Để trống nếu không thay đổi"
            autoComplete="new-password"  // Thêm autocomplete
            aria-describedby="password-help"  // Thêm ARIA
          />
          <small id="password-help">Để trống nếu không muốn thay đổi</small>
        </label>

        <label>
          Xác nhận mật khẩu:
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"  // Thêm autocomplete
            aria-label="Xác nhận mật khẩu mới"  // Thêm ARIA
          />
        </label>

        <button type="submit" className="save-btn">
          💾 Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default Settings;
