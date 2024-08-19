import React, { useState } from 'react';
import axios from 'axios';
import './Medicinal.css';

function Medicinal() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/medicinal/', { input });
      setResult(response.data.details || 'No result found.');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred.');
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
    <div className="medicinal-container">
      <h1>Medicinal Uses</h1>

      <form onSubmit={handleSubmit} className="medicinal-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your health concern..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      <div className="medicinal-results">
        {error && <p className="error-message">{error}</p>}
        {formatDetails(result)}
      </div>
    </div>
  );
}

export default Medicinal;