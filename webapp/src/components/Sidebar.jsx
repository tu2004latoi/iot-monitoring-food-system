import React from "react";
import {
    FaHome,
    FaChartBar,
    FaCog,
    FaBoxOpen,
    FaSignOutAlt,
} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import "./Sidebar.css";
import {useAuth} from '../context/AuthContext';

const Sidebar = () => {
    const {logout} = useAuth();
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink to="/" className="nav-item">
                        <FaHome className="icon" />
                        <span>Trang chủ</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/products" className="nav-item">
                        <FaBoxOpen className="icon" />
                        <span>Quản lý sản phẩm</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/statistics" className="nav-item">
                        <FaChartBar className="icon" />
                        <span>Thống kê</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/settings" className="nav-item">
                        <FaCog className="icon" />
                        <span>Cài đặt</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/test" className="nav-item">
                        <FaCog className="icon" />
                        <span>Test</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/logout" className="nav-item" onClick={handleLogout}>
                        <FaSignOutAlt className="icon" />
                        <span>Logout</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
