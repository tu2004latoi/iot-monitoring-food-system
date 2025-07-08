import "./Home.css";
const Home = ({products}) => {

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">📦 Danh sách sản phẩm</h1>

            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.productId}>
                        <img src={product.image} alt={product.productName} className="product-image" />

                        <div className="product-info">
                            <h3 className="product-name">{product.productName}</h3>
                            <p className="product-category">{product.category.categoryName}</p>
                            <p className="product-stock">
                                Tồn kho:{" "}
                                <span className={product.quantity === 0 ? "out" : "in"}>
                                    {product.quantity} </span>
                            </p>
                    <p className="product-status">status:  {product.status}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
