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
<<<<<<< HEAD
=======
import { useAuth } from "./context/AuthContext"; // Thêm import
import Categories from "./pages/Categories";
import Devices from "./pages/Devices";
import { useDevices } from "./hooks/useDevices";
>>>>>>> dev

// ✅ PrivateRoute kiểm tra đăng nhập
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
<<<<<<< HEAD
  const { token } = useAuth();
  const location = useLocation();

=======
  const { user } = useAuth();
>>>>>>> dev
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

<<<<<<< HEAD
  const layoutVisiblePaths = ["/home", "/products", "/settings", "/test"];
  const showLayout = token && layoutVisiblePaths.includes(location.pathname);
=======

  const {
    categories,
    units,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
>>>>>>> dev

  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  return(
    <div className={`app ${theme}`}>
<<<<<<< HEAD
      {/* Không còn Header */}
      {showLayout && (
        <FaBars
          className={`toggle-button ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
=======
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      {user && (
        <FaBars 
          className={`text-4xl toggle-button ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
>>>>>>> dev
          onClick={toggleSidebar}
          title="Thu nhỏ"
        />
      )}
<<<<<<< HEAD

      <div className="container">
        {showLayout && (
          <div className={`left ${isSidebarOpen ? "open" : "closed"}`}>
            <Sidebar toggleTheme={toggleTheme} currentTheme={theme} />
=======
      <div className="container flex h-screen w-screen">
        {user && (
          <div className={`h-screen left ${isSidebarOpen ? "open" : "closed"}`}>
            <Sidebar />
>>>>>>> dev
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
