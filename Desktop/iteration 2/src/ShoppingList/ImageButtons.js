// src/components/ImageButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toWasteImage from '../images/BacktoPantry.png';
import './ImageButtons.css';

function ImageButtons() {
    const navigate = useNavigate();

    return (
        <div className="custom1-fixed-button">
            {/* 左侧的 Waste Analytics 按钮 */}
            <img
                src={toWasteImage}
                alt="Waste Analytics"
                className="custom1-fixed-button"
                onClick={() => navigate('/inventory')}
            />
            
        </div>
    );
}

export default ImageButtons;
