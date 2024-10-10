// src/components/ImageButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toMealPlanImage from '../images/ToMealPlan.png';
import toWasteImage from '../images/ToWaste.png';
import './ImageButtons.css';

function ImageButtons() {
    const navigate = useNavigate();

    return (
        <div className="image-buttons">
            {/* 左侧的 Waste Analytics 按钮 */}
            <img
                src={toWasteImage}
                alt="Waste Analytics"
                className="image-button left-button"
                onClick={() => navigate('/analytics')}
            />
            {/* 右侧的 Meal Plan 按钮 */}
            <img
                src={toMealPlanImage}
                alt="Meal Plan"
                className="image-button right-button"
                onClick={() => navigate('/mealplan')}
            />
        </div>
    );
}

export default ImageButtons;
