import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa'; // Importing react-icons
import Slider from 'react-slick'; // Importing react-slick
import 'slick-carousel/slick/slick.css'; // Import slick carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick carousel theme CSS
import './Home.css';

const categoryData = [
    {
        title: 'Culinary Uses',
        icon: <FaIcons.FaUtensils />,
        link: '/culinary',
    },
    {
        title: 'Beauty Uses',
        icon: <FaIcons.FaSpa />,
        link: '/beauty',
    },
    {
        title: 'Medicinal Uses',
        icon: <FaIcons.FaMedkit />,
        link: '/medicinal',
    },
    {
        title: 'Pregnancy Uses',
        icon: <FaIcons.FaBaby />,
        link: '/pregnancy',
    },
];

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Saffron AI Assistant</h1>
                    <p>Your AI-powered guide to the wonders of saffron.</p>
                </div>
            </div>

            <div className="categories-container">
                <h2>Explore Saffron's Potential</h2>
                <Slider {...settings} className="category-slider">
                    {categoryData.map((category, index) => (
                        <div 
                            key={index} 
                            className="category-item"
                        > 
                            <Link to={category.link} className="category-link">
                                <div className="category-info">
                                    <div className="category-icon">
                                        {category.icon}
                                    </div>
                                    <h3>{category.title}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Home;
