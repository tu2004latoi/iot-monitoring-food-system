import React, { useState } from "react";
import { CATEGORIES } from "../constants";
import AddEditProductModal from "../components/AddEditProductModal";
import "./Products.css";

const Products = ({ products, addProduct, updateProduct, deleteProduct }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const filtered = products.filter((p) => {
    const matchCat = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = () => {
    setEditProduct(null);    
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditProduct(product); 
    setShowModal(true);
  };

  const handleSave = (productData) => {
    if (editProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setShowModal(false);    
  };

  return (
    <div className="products-page">

      <div className="products-header">
        <h2>📦 Quản lý sản phẩm</h2>
        <button onClick={handleAdd} className="add-button">
          + Thêm sản phẩm
        </button>
      </div>

      <div className="filters">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Tìm sản phẩm..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "Tất cả" : c}
            </option>
          ))}
        </select>
      </div>


      <table className="product-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Thương hiệu</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Tồn kho</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-results">
                Không có sản phẩm.
              </td>
            </tr>
          ) : (
            filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name} width="50" height="50" />
                </td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.category}</td>
                <td>{p.price.toLocaleString()}₫</td>
                <td>{p.stock}</td>
                <td className={p.status === "active" ? "status-active" : "status-out"}>
                  {p.status === "active" ? "Còn hàng" : "Hết hàng"}
                </td>
                <td>

                  <button className="edit-btn" onClick={() => handleEdit(p)}>
                    Sửa
                  </button>
                  <button className="delete-btn" onClick={() => deleteProduct(p.id)}>
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <AddEditProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        initialData={editProduct}
      />
    </div>
  );
};

export default Products;
