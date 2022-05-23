import React from "react";
import "../../assets/styles/components/filters.css";

const Filter = ({ filters, updateSearchProps }) => {
  const handleClick = (event) => {
    if (event.target.classList.contains("filter-selected")) {
      event.target.classList.remove("filter-selected");
      updateSearchProps(
        event.target.parentNode.previousElementSibling.textContent
      );
    } else {
      [...event.target.parentNode.children].forEach((item) =>
        item.classList.remove("filter-selected")
      );
      event.target.classList.add("filter-selected");
      updateSearchProps(
        event.target.parentNode.previousElementSibling.textContent,
        event.target.textContent.toLowerCase()
      );
    }
  };

  return (
    <div className="filter">
      {Object.keys(filters).map((item) => {
        return (
          <>
            <p className="filter__name">{item}:</p>
            <div className="filter__container">
              {filters[item].map((value) => (
                <button
                  key={value}
                  className="filter__value"
                  onClick={(e) => handleClick(e)}
                >
                  {value}
                </button>
              ))}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Filter;
