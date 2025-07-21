import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import { useProducts } from "./hooks/useProducts";
import Settings from "./pages/Settings";
import Testapp from "./Testapp";
import { FaBars } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";
import "./App.css";

// ✅ PrivateRoute kiểm tra đăng nhập
const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { token } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const layoutVisiblePaths = ["/home", "/products", "/settings", "/test"];
  const showLayout = token && layoutVisiblePaths.includes(location.pathname);

  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  return (
    <div className={`app ${theme}`}>
      {/* Không còn Header */}
      {showLayout && (
        <FaBars
          className={`toggle-button ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
          onClick={toggleSidebar}
          title="Thu nhỏ"
        />
      )}

      <div className="container">
        {showLayout && (
          <div className={`left ${isSidebarOpen ? "open" : "closed"}`}>
            <Sidebar toggleTheme={toggleTheme} currentTheme={theme} />
          </div>
        )}

        <div
          className={`right ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home products={products} />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products
                    products={products}
                    addProduct={addProduct}
                    updateProduct={updateProduct}
                    deleteProduct={deleteProduct}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/test"
              element={
                <PrivateRoute>
                  <Testapp />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
