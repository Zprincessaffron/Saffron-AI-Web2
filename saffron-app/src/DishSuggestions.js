import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DishSuggestions.css'; 

const DishSuggestions = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a query.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/culinary/', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: `suggest me a dessert ${query}` }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setSuggestions(data.recommendations || []); 
    } catch (error) {
      console.error('Error fetching dish suggestions:', error);
      setError('Error fetching suggestions.');
    } finally {
      setLoading(false);
    }
  };

  const handleDishSelect = (dish) => {
    navigate(`/culinary/suggestions/details/${encodeURIComponent(dish)}`);
  };

  return (
    <div className="dish-suggestions-container"> 
      <h2>Dish Suggestions</h2>

      <div className="dish-search"> 
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter query"
          aria-label="Dish suggestion query"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Get Suggestions'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>} 

      {suggestions.length > 0 && (
        <div className="dish-suggestions-list">
          <ul>
            {suggestions.map((dish, index) => (
              <li key={index}>
                <button onClick={() => handleDishSelect(dish)}>
                  {dish}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DishSuggestions;