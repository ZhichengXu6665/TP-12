import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // 导入 useLocation 钩子
import './Navbar.css';
import logoImage from '../images/logo.png';
import NotificationBell from './NotificationBell';

function Navbar({ inventory = [] }) {
    const location = useLocation(); // 获取当前路径

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logoImage} alt="Logo" className="logo-img" />
                <span className="logo-text">ecopantry</span>
            </div>
            <div className="nav-links">
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className={location.pathname === "/inventory" ? "active" : ""}>
                        <Link to="/inventory" className="nav-link">Inventory</Link>
                    </li>
                    <li className={location.pathname === "/mealplan" ? "active" : ""}>
                        <Link to="/mealplan" className="nav-link">Mealplan</Link>
                    </li>
                    <li className={location.pathname === "/analytics" ? "active" : ""}>
                        <Link to="/analytics" className="nav-link">Waste Analytics</Link>
                    </li>
                    <li className={location.pathname === "/shoppingList" ? "active" : ""}>
                        <Link to="/shoppingList" className="nav-link">Shopping List</Link>
                    </li>
                    <li className={location.pathname === "/knowledge-hub" ? "active" : ""}>
                        <Link to="/knowledge-hub" className="nav-link">Knowledge Hub</Link>
                    </li>
                </ul>
                {/* NotificationBell 组件，用于显示过期物品和未来7天内即将过期的物品提示 */}
                <NotificationBell inventory={inventory} />
            </div>
        </nav>
    );
}

export default Navbar;
