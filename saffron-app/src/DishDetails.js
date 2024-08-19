import React, { useState } from 'react';
import './DishDetails.css';

const DishDetails = () => {
  const [dishName, setDishName] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!dishName.trim()) {
      alert('Please enter a dish name.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/culinary/details/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dish: dishName }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setDetails(data.details || 'No details available for this dish.');
    } catch (error) {
      console.error('Error fetching dish details:', error);
      setDetails('Error fetching details.');
    } finally {
      setLoading(false);
    }
  };

  // Function to format details 
  const formatDetails = (detailsString) => {
    const detailSections = detailsString.split('\n\n').filter(Boolean);

    return detailSections.map((section, index) => (
      <div key={index} className="detail-section">
        {section.split('\n').map((line, lineIndex) => {
          if (line.startsWith('* ')) {
            return <p key={lineIndex} className="ingredient-line">{line.substring(2)}</p>;
          } else if (line.startsWith('**')) {
            return <h3 key={lineIndex}>{line.replace(/\*\*/g, '')}</h3>;
          } else {
            return <p key={lineIndex}>{line}</p>;
          }
        })}
      </div>
    ));
  };

  return (
    <div className="dish-details-container">
      <h2>Dish Details</h2>

      <div className="dish-search">
        <input
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          placeholder="Enter dish name"
          aria-label="Dish name"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Get Dish Details'}
        </button>
      </div>

      <div className="dish-details-content">
        <h3>Details:</h3>
        {formatDetails(details)} 
      </div>
    </div>
  );
};

export default DishDetails;