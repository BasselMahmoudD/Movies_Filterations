import React from "react";

export default function Filter({ onFilterChange }) {
  const handleYearChange = (e) => {
    
    onFilterChange("year", e.target.value);
  };

  const handleRatingChange = (e) => {
    onFilterChange("rating", e.target.value);
  };

  return (
    <div className="filter-container">
      <h3>Filter</h3>

      <div className="filter-group">
        <label>Year:</label>
        <input
          type="number"
          placeholder="e.g. 2020"
          onChange={handleYearChange}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label>Min Rating:</label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          placeholder="e.g. 7.5"
          onChange={handleRatingChange}
          className="filter-input"
        />
      </div>
    </div>
  );
}
