import React from "react";
import "../../assets/styles/components/filters.css";

const Filter = ({ filters }) => {
  return (
    <div className="filter">
      {Object.keys(filters).map((item) => {
        return (
          <>
            <p className="filter__name">{item}:</p>
            <div className="filter__container">
              {filters[item].map((value) => (
                <button className="filter__value">{value}</button>
              ))}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Filter;
