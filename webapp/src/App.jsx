import React, {useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import {useProducts} from "./hooks/useProducts";
import Settings from "./pages/Settings";
import {FaBars} from "react-icons/fa";
import "./App.css";
import Testapp from "./Testapp";
import {useAuth} from "./context/AuthContext"; // Thêm import

// Tạo PrivateRoute component
const PrivateRoute = ({children}) => {
    const {token} = useAuth();
    return token ? children : <Navigate to="/login" />;
};

function App() {
    const [theme, setTheme] = useState("light");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {token} = useAuth();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));


    const {products, addProduct, updateProduct, deleteProduct} = useProducts();
       return (
        <div className={`app ${theme}`}>
            <Header toggleTheme={toggleTheme} currentTheme={theme} />
            {token && (
                <FaBars
                    className={`toggle-button ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
                    onClick={toggleSidebar}
                />
            )}
            <div className="container">
                {token && (
                    <div className={`left ${isSidebarOpen ? "open" : "closed"}`}>
                        <Sidebar />
                    </div>
                )}

                <div className={`right ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
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
