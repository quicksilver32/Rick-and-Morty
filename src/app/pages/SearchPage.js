import React, { useEffect, useState } from "react";
import "../../assets/styles/pages/search-page.css";
import Filter from "../components/Filter";
import Search from "../components/Search";
import CharacterCard from "../components/CharacterCard";
import LocationCard from "../components/LocationCard";
import EpisodeCard from "../components/EpisodeCard";
import Pagination from "../components/Pagination";
import { getItems, filters } from "../utils/utils";

const SearchPage = ({ type }) => {
  const [searchProps, setSearchProps] = useState({});
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [error, setError] = useState({ status: false, msg: "" });

  useEffect(() => {
    let fetchUrl = "";
    if (Object.keys(searchProps).length !== 0) {
      fetchUrl += "/?";
      const urlParams = new URLSearchParams();
      for (let key in searchProps) {
        urlParams.append(key, searchProps[key]);
      }
      fetchUrl += urlParams.toString();
    }
    getItems(fetchUrl, type)
      .then((result) => {
        setError({ status: false, msg: "" });
        setData(result);
      })
      .catch((err) => {
        setData([]);
        setError({ status: true, msg: err.message });
      });
  }, [searchProps, type]);

  const updateSearchProps = (filterName, filterValue = null) => {
    const cleanFilterName = filterName.replaceAll(":", "").toLowerCase();
    if (filterValue !== null) {
      setSearchProps({ ...searchProps, [cleanFilterName]: filterValue });
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
        {data.results &&
          type === "character" &&
          data.results.map((item) => (
            <CharacterCard key={item.id} info={item} />
          ))}
        {data.results &&
          type === "location" &&
          data.results.map((item) => (
            <LocationCard key={item.id} info={item} />
          ))}
        {data.results &&
          type === "episode" &&
          data.results.map((item) => <EpisodeCard key={item.id} info={item} />)}
        {error.status && <p className="not-found">{error.msg}</p>}
      </div>
      {!error.status && data.info && (
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
