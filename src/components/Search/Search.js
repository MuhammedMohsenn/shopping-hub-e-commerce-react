import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Search.scss";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <form className="navbar-search flex" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search here ..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className="navbar-search-btn">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default Search;
