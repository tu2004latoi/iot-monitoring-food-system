import "./Categories.css";
const Categories = ({ categories }) => {

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📦 Danh sách loại sản phẩm</h1>
      <div className="product-grid">
        {categories.map((cate) => (
          <div className="product-card" key={cate.categoryId}>
            <div className="product-info">
              <h3 className="product-name">{cate.categoryName}</h3>
              <h3 className="product-name">{cate.description}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

