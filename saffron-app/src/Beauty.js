import React, { useState } from 'react';
import axios from 'axios';
import './Beauty.css'; 

function Beauty() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading to true when submitting

    try {
      const response = await axios.post('http://localhost:8000/beauty/', { input });
      setResult(response.data.details || 'No result found.');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred.');
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  // Function to format details (reused from DishDetails)
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
    <div className="beauty-container">
      <h1>Beauty Uses</h1>

      <form onSubmit={handleSubmit} className="beauty-form"> 
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your beauty concern..."
        />
        <button type="submit" disabled={loading}> {/* Disable button while loading */}
          {loading ? 'Loading...' : 'Submit'} {/* Conditional button text */}
        </button>
      </form>

      <div className="beauty-results">
        {error && <p className="error-message">{error}</p>}
        {formatDetails(result)}
      </div>
    </div>
  );
}

export default Beauty;