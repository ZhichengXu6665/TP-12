import React from 'react';
import { Link } from 'react-router-dom';  // 引入 Link 组件
import './Features.css';
import pantryImage from '../images/pantrymanagement.png';
import mealPlanningImage from '../images/mealplanning.png';
import wasteAnalyticsImage from '../images/wasteanalytics.png';
import knowledgeImage from '../images/knowledge.png';

function Features() {
    return (
        <div className="features-container">
            <h2 className="features-title">What We’re Offering</h2> {/* 添加标题 */}
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-content">
                        <img src={pantryImage} alt="Pantry Management" className="feature-icon"/>
                        <h3>Pantry Management</h3>
                        <p>Manage your pantry with ease: upload shopping receipts, track items in your inventory, and edit expiry dates effortlessly.</p>
                    </div>
                    <div className="feature-arrow">
                        <Link to="/inventory" className="arrow-link">
                            <div className="arrow-circle">→</div>
                        </Link>
                    </div>
                </div>
                <div className="feature-card">
                    <div className="feature-content">
                        <img src={mealPlanningImage} alt="Meal Planning" className="feature-icon"/>
                        <h3>Meal Planning</h3>
                        <p>Plan your meals effortlessly: get personalized recipe suggestions based on the items in your pantry.</p>
                    </div>
                    <div className="feature-arrow">
                        <Link to="/mealplan" className="arrow-link">
                            <div className="arrow-circle">→</div>
                        </Link>
                    </div>
                </div>
                <div className="feature-card">
                    <div className="feature-content">
                        <img src={wasteAnalyticsImage} alt="Waste Tracker" className="feature-icon"/>
                        <h3>Waste Tracker</h3>
                        <p>Reduce food waste with insights on how to cut down waste and make eco-friendly decisions.</p>
                    </div>
                    <div className="feature-arrow">
                        <Link to="/analytics" className="arrow-link">
                            <div className="arrow-circle">→</div>
                        </Link>
                    </div>
                </div>
                <div className="feature-card">
                    <div className="feature-content">
                        <img src={knowledgeImage} alt="Knowledge Hub" className="feature-icon"/>
                        <h3>Knowledge Hub</h3>
                        <p>Explore the Knowledge Hub: learn about food waste, its environmental impact, and discover practical tips to reduce waste.</p>
                    </div>
                    <div className="feature-arrow">
                        <Link to="/knowledge-hub" className="arrow-link">
                            <div className="arrow-circle">→</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;
