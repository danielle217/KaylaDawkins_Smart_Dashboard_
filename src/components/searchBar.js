import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="card">
      <h2>Search News</h2>
      <input
        type="text"
        placeholder="Search headlines..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button onClick={() => setSearchTerm('')}>Clear</button>
      )}
    </div>
  );
}

export default SearchBar;