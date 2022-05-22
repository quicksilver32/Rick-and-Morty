import React from "react";
import "../../assets/styles/pages/search-page.css";
import Filter from "../components/Filter";

const CharacterSearchPage = () => {
  return (
    <div className="main">
      <Filter
        filters={{
          status: ["alive", "dead", "unknown"],
          gender: ["male", "female", "genderless", "unknown"],
        }}
      />
    </div>
  );
};

export default CharacterSearchPage;
