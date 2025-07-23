import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import { useProducts } from "./hooks/useProducts";
import Settings from "./pages/Settings";
import { FaBars } from "react-icons/fa";
import "./App.css";
import { useAuth } from "./context/AuthContext"; // Thêm import
import Categories from "./pages/Categories";
import Devices from "./pages/Devices";
import { useDevices } from "./hooks/useDevices";
import { useCategories } from "./hooks/useCategories";
import PushNotification from "./components/PushNotification";

// Tạo PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));


  const {
    units,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  
  const {
    categories,
    addCates,
    deleteCates,
  } = useCategories();

  const {
    devices,
    addDevice,
    updateDevice,
    deleteDevice,
  } = useDevices();

  return(
    <div className={`app ${theme}`}>
      <PushNotification/>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      {user && (
        <FaBars 
          className={`text-4xl toggle-button ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
          onClick={toggleSidebar}
        />
      )}
      <div className="container flex h-screen w-screen">
        {user && (
          <div className={`h-screen left ${isSidebarOpen ? "open" : "closed"}`}>
            <Sidebar />
          </div>
        )}

        <div
          className={`h-screen right ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home
                    products={products}
                    categories={categories}
                    units={units}
                  />
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
                    categories={categories}
                    units={units}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateRoute>
                  <Categories 
                    categories={categories} 
                    addCates={addCates}
                    deleteCates={deleteCates}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/devices"
              element={
                <PrivateRoute>
                  <Devices
                    devices={devices}
                    addDevice={addDevice}
                    updateDevice={updateDevice}
                    deleteDevice={deleteDevice}
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
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
