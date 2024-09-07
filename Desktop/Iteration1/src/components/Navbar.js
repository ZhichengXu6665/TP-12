import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <span className="logo-text">ecopantry</span>
            </div>
            <ul>
                <li className="active">Home</li>
                <li>Inventory</li>
                <li>Analytics</li>
                <li>MealPlan</li>
                <li>Knowledge Hub</li>
            </ul>
        </nav>
    );
}

export default Navbar;
