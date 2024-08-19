// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Culinary from './Culinary';
import CulinaryOptions from './CulinaryOptions'; // Import the new Culinary options component
import DishSuggestions from './DishSuggestions'; // Import the suggestions component
import DishDetail from './DishDetail';
import DishDetails from './DishDetails'; // Import the details component
import Beauty from './Beauty';
import Medicinal from './Medicinal';
import Pregnancy from './Pregnancy';
import './styles.css'; // Importing the CSS file

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/culinary" element={<Culinary />} />
          <Route path="/culinary/options" element={<CulinaryOptions />} />
          <Route path="/culinary/suggestions" element={<DishSuggestions />} />
          <Route path="/culinary/suggestions/details/:dishName" element={<DishDetail />} /> {/* Updated path for dish details */}
          <Route path="/culinary/details" element={<DishDetails />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/medicinal" element={<Medicinal />} />
          <Route path="/pregnancy" element={<Pregnancy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
