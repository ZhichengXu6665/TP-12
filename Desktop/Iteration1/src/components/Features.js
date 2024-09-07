import React from 'react';
import './Features.css';
import pantryImage from '../images/pantrymanagement.png';
import mealPlanningImage from '../images/mealplanning.png';
import wasteAnalyticsImage from '../images/wasteanlytics.png';
import knowledgeImage from '../images/knowledge.png';

function Features() {
    return (
        <div className="features">
            <div className="feature">
                <img src={pantryImage} alt="Pantry Management" />
                <p>Pantry Management</p>
            </div>
            <div className="feature">
                <img src={mealPlanningImage} alt="Meal Planning" />
                <p>Meal Planning</p>
            </div>
            <div className="feature">
                <img src={wasteAnalyticsImage} alt="Waste Analytics" />
                <p>Waste Analytics</p>
            </div>
            <div className="feature">
                <img src={knowledgeImage} alt="Knowledge Hub" />
                <p>Knowledge Hub</p>
            </div>
        </div>
    );
}

export default Features;
