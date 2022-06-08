import React, { useState } from "react";
import "../../assets/styles/components/search.css";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ updateSearchProps }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSearchProps("name", value !== "" ? value : null);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search__form">
        <input
          className="search__input"
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />
        <button type="submit" className="search__button">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default Search;
