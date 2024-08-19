import React, { useState } from 'react';
import axios from 'axios';
import './Pregnancy.css'; // Import the CSS file

function Pregnancy() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/pregnancy/', { input });
      setResult(response.data.details || 'No result found.');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Function to format details (reuse from previous components)
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
    <div className="pregnancy-container"> 
      <h1>Pregnancy Uses</h1>

      <form onSubmit={handleSubmit} className="pregnancy-form"> 
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your pregnancy concern..."
        />
        <button type="submit" disabled={loading}> 
          {loading ? 'Loading...' : 'Submit'} 
        </button>
      </form>

      <div className="pregnancy-results"> 
        {error && <p className="error-message">{error}</p>}
        {formatDetails(result)} 
      </div>
    </div>
  );
}

export default Pregnancy;