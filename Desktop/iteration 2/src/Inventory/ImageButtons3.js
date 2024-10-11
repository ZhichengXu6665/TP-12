import React from 'react';
import { useNavigate } from 'react-router-dom';
import toMealPlanImage from '../images/ToMealPlan.png';
import toWasteImage from '../images/ToWaste.png';
import './ImageButtons3.css';

function InventoryImageButtons() {
    const navigate = useNavigate();

    return (
        <div className="custom3-fixed-buttons">
            {/* Waste Analytics Button */}
            <img
                src={toWasteImage}
                alt="Waste Analytics"
                className="custom3-left-fixed-button"
                onClick={() => navigate('/analytics')}
            />
            {/* Meal Plan Button */}
            <img
                src={toMealPlanImage}
                alt="Meal Plan"
                className="custom3-right-fixed-button"
                onClick={() => navigate('/mealplan')}
            />
        </div>
    );
}

export default InventoryImageButtons;
