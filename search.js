import React from 'react';

const SearchAndFilter = ({ setSearchText, setFilter }) => {
  return (
    <div className="search-and-filter">
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="notCompleted">Not Completed</option>
        <option value="highPriority">High Priority</option>
        <option value="mediumPriority">Medium Priority</option>
        <option value="lowPriority">Low Priority</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
