import React from "react";

function SearchBar({ onSortChange, sortBy, onFilterChange, filterBy }) {
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          name="sort"
          checked={sortBy === "Alphabetically"}
          onChange={() => onSortChange("Alphabetically")}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          name="sort"
          checked={sortBy === "Price"}
          onChange={() => onSortChange("Price")}
        />
        Price
      </label>
      <br />
      <label>
        <strong>Filter:</strong>
        <select value={filterBy} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
