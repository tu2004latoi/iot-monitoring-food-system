export const Categories = ({ categories }) => {
  return (
    <>
      {categories.map((p) => (
        <tr key={p.productId}>
          <td>
            <img src={p.image} alt={p.name} width="50" height="50" />
          </td>
          <td>{p.productName}</td>
          <td>{getCategoryName(p.categoryId) || "Chưa phân loại"}</td>
          <td>{p.status}</td>
          <td>{p.expiryDate}</td>
          <td>{p.detectedAt}</td>
          <td>{getUnitName(p.unitId) || "Không rõ"}</td>
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
      ))}
    </>
  );
}
