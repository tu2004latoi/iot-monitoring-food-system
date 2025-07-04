
import "./Home.css";

const Home = ({ products }) => {


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📦 Danh sách sản phẩm</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price.toLocaleString()}₫</p>
              <p className="product-stock">
                Tồn kho:{" "}
                <span className={product.stock === 0 ? "out" : "in"}>
                  {product.stock}
                </span>
              </p>
              <p className="product-rating">⭐ {product.rating} | Bán: {product.sales}</p>
              <span className={`status-badge ${product.status}`}>
                {product.status === "active" ? "Đang bán" : "Hết hàng"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
