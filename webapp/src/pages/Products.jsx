import React, { useState } from "react";
import AddEditProductModal from "../components/AddEditProductModal";
import "./Products.css";
import { useProducts } from "../hooks/useProducts"
const Products = ({ products, addProduct, updateProduct, deleteProduct }) => {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("all");
	const [showModal, setShowModal] = useState(false);
	const [editProduct, setEditProduct] = useState(null);
	const { categories = [] } = useProducts();
	const filtered = products.filter((p) => {
		const matchCat = category === "all" || p.category?.categoryName === category;
		const matchSearch = p.productName?.toLowerCase().includes(search.toLowerCase());
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
		if (editProduct.productId) {
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
					<option value="all">Tất cả</option>
					{categories.map((c) => (
						<option key={c.categoryId} value={c.categoryId} >
							{c.categoryName}
						</option>
					))}
				</select>
			</div>

			<table className="product-table">
				<thead>
					<tr>
						<th>Ảnh</th>
						<th>Tên</th>
						<th>Loại</th>
						<th>Trạng thái</th>
						<th>Hạn sử dụng</th>
						<th>Ngày nhập</th>
						<th>Đơn vị</th>
						<th>Số lượng</th>
						<th>Lưu ý</th>
						<th>Hành động</th>
					</tr>
				</thead>
				<tbody>
					{filtered.length === 0 ? (
						<tr>
							<td colSpan="10" className="no-results">
								Không có sản phẩm.
							</td>
						</tr>
					) : (
						filtered.map((p) => (
							<tr key={p.productId}>
								<td>
									<img src={p.image} alt={p.name} width="50" height="50" />
								</td>
								<td>{p.productName}</td>
								<td>{p.cateory?.categoryName || "Chưa phân loại"}</td>
								<td>{p.status}</td>
								<td>{p.expiryDate}</td>
								<td>{p.detectedAt}</td>
								<td>{p.unit?.unitName || "Không rõ"}</td>
								<td>{p.quantity}</td>
								<td>{p.notes}</td>
								<td>
									<button className="edit-btn" onClick={() => handleEdit(p)}>
										Sửa
									</button>
									<button className="delete-btn" onClick={() => deleteProduct(p.productId)}>
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

