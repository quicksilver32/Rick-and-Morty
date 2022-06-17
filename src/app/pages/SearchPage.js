import React, { useState } from "react";
import "../../assets/styles/pages/search-page.css";
import Filter from "../components/Filter";
import Search from "../components/Search";
import CharacterCard from "../components/CharacterCard";
import LocationCard from "../components/LocationCard";
import EpisodeCard from "../components/EpisodeCard";
import Pagination from "../components/Pagination";
import { filters } from "../utils/utils";
import { useLoadInfo } from "../components/useLoadInfo";

const SearchPage = ({ type }) => {
  const [searchProps, setSearchProps] = useState({});
  const [page, setPage] = useState(1);
  const { loading, data, error } = useLoadInfo(searchProps, type);

  const updateSearchProps = (filterName, filterValue = null) => {
    const cleanFilterName = filterName.replaceAll(":", "").toLowerCase();
    if (filterValue !== null) {
      const temp = {};
      if (cleanFilterName !== "page") {
        temp.page = 1;
      }
      setSearchProps({
        ...searchProps,
        ...temp,
        [cleanFilterName]: filterValue,
      });
    } else {
      const temp = { ...searchProps };
      delete temp[cleanFilterName];
      setSearchProps(temp);
    }
  };

  return (
    <div className="main-search">
      <Filter filters={filters[type]} updateSearchProps={updateSearchProps} />
      <div className="cards">
        <Search updateSearchProps={updateSearchProps} />
        {!loading &&
          !error.status &&
          type === "character" &&
          data.results.map((item) => (
            <CharacterCard key={item.id} info={item} />
          ))}
        {!loading &&
          !error.status &&
          type === "location" &&
          data.results.map((item) => (
            <LocationCard key={item.id} info={item} />
          ))}
        {!loading &&
          !error.status &&
          type === "episode" &&
          data.results.map((item) => <EpisodeCard key={item.id} info={item} />)}
        {error.status && <p className="not-found">{error.msg}</p>}
      </div>
      {!loading && !error.status && (
        <Pagination
          updateSearchProps={updateSearchProps}
          currPage={page}
          setPage={setPage}
          prev={data.info.prev}
          next={data.info.next}
        />
      )}
    </div>
  );
};

export default SearchPage;
