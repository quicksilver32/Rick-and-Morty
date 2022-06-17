import React, { useState } from "react";
import "../../assets/styles/components/filters.css";

const Filter = ({ filters, updateSearchProps }) => {
  const [checkedFilters, setCheckedFilters] = useState({});

  const handleClick = (event, item, value) => {
    if (checkedFilters[item] === value) {
      setCheckedFilters({ ...checkedFilters, [item]: null });
      updateSearchProps(item);
    } else {
      setCheckedFilters({ ...checkedFilters, [item]: value });
      updateSearchProps(item, value.toLowerCase());
    }
  };

  return (
    <div className="filter">
      {Object.keys(filters).map((item) => {
        return (
          <div key={item}>
            <p className="filter__name">{item}:</p>
            <div className="filter__container">
              {filters[item].map((value) => (
                <button
                  key={value}
                  className={
                    "filter__value" +
                    (checkedFilters[item] === value ? " filter-selected" : "")
                  }
                  onClick={(e) => handleClick(e, item, value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
