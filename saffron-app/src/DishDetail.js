import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DishDetail.css';

const DishDetail = () => {
  const { dishName } = useParams();
  const [dishDetail, setDishDetail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8000/culinary/details/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dish: decodeURIComponent(dishName) }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        setDishDetail(data.details || 'No details available.');
      } catch (error) {
        console.error('Error fetching dish details:', error);
        setError('Error fetching details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDishDetail();
  }, [dishName]);

  // Split dish details into sections
  const detailSections = dishDetail.split('\n\n').filter(Boolean);

  return (
    <div className="dish-detail-container">
      <h2>Dish Detail: {decodeURIComponent(dishName)}</h2> 

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="dish-detail-content">
        {detailSections.map((section, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default DishDetail;