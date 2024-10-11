// src/components/FixedButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toWasteImage from '../images/BacktoPantry.png';
import './ImageButtons2.css'; // 注意修改为新的 CSS 文件名

function FixedButtons() {
    const navigate = useNavigate();

    return (
        <div className="custom-fixed-button">
            {/* 固定在右下角的按钮 */}
            <img
                src={toWasteImage}
                alt="Back to Pantry"
                className="custom-fixed-button"
                onClick={() => navigate('/inventory')}
            />
        </div>
    );
}

export default FixedButtons;
