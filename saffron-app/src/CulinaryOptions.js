// src/CulinaryOptions.js
import React from 'react';
import { Link } from 'react-router-dom';

const CulinaryOptions = () => {
  return (
    <div>
      <h2>Culinary Options</h2>
      <ul>
        <li><Link to="/culinary/suggestions">Dish Suggestions</Link></li>
        <li><Link to="/culinary/details">Dish Details</Link></li>
      </ul>
    </div>
  );
};

export default CulinaryOptions;
