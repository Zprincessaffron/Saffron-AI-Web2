import React from 'react';
import { Link } from 'react-router-dom';
import './Culinary.css';

const culinaryOptions = [
    {
        title: 'Dish Suggestions',
        link: '/culinary/suggestions',
        image: '/images/dish-suggestions.jpg', 
    },
    {
        title: 'Dish Details',
        link: '/culinary/details',
        image: '/images/dish-details.jpg',
    },
];

function Culinary() {
    return (
        <div className="culinary-container">
            <div className="culinary-header">
                <h1>Culinary Uses</h1>
                <p>Select an option to proceed:</p>
            </div>

            <div className="culinary-options"> 
                {culinaryOptions.map((option, index) => (
                    <div key={index} className="culinary-option">
                        <Link to={option.link}>
                            <div 
                                className="option-image" 
                                style={{ backgroundImage: `url(${option.image})` }}
                            >
                                {/* Optional: Title Overlay */}
                                <div className="option-title">
                                    <h2>{option.title}</h2>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Culinary;