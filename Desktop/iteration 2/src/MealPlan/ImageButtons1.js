// src/components/ImageButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toMealPlanImage from '../images/GoShoppingList.png';
import toWasteImage from '../images/BacktoPantry.png';
import './ImageButtons1.css'; // 引入新的样式文件

function ImageButtons() {
    const navigate = useNavigate();

    return (
        <div className="custom-image-buttons">
            {/* 左侧的 Waste Analytics 按钮 */}
            <img
                src={toWasteImage}
                alt="Waste Analytics"
                className="custom-image-button custom-left-button"
                onClick={() => navigate('/inventory')}
            />
            {/* 右侧的 Meal Plan 按钮 */}
            <img
                src={toMealPlanImage}
                alt="Meal Plan"
                className="custom-image-button custom-right-button"
                onClick={() => navigate('/shoppingList')}
            />
        </div>
    );
}

export default ImageButtons;
