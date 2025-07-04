import React, { useState, useEffect } from "react";
import "./AddEditProductModal.css";

const defaultForm = {
  name: "",
  category: "Smartphone",
  price: 0,
  stock: 0,
  image: "",
  status: "active",
  brand: ""
};

const AddEditProductModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(defaultForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
    setForm(defaultForm); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên sản phẩm</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand">Thương hiệu</label>
            <input
              id="brand"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="VD: Apple, Samsung..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Giá (VNĐ)</label>
            <input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Tồn kho</label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Link ảnh</label>
            <input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Dán link ảnh sản phẩm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Danh mục</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphones">Headphones</option>
              <option value="Camera">Camera</option>
              <option value="Watch">Watch</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Trạng thái</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="active">Còn hàng</option>
              <option value="out-of-stock">Hết hàng</option>
            </select>
          </div>

          <div className="modal-buttons">
            <button type="submit">Lưu</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProductModal;
