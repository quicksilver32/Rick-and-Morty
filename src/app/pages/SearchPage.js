import React, { useEffect, useState } from "react";
import "../../assets/styles/pages/search-page.css";
import Filter from "../components/Filter";
import Search from "../components/Search";
import CharacterCard from "../components/CharacterCard";
import LocationCard from "../components/LocationCard";
import EpisodeCard from "../components/EpisodeCard";
import Pagination from "../components/Pagination";

const SearchPage = ({ type }) => {
  const [searchProps, setSearchProps] = useState({});
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [error, setError] = useState({ status: false, msg: "" });

  useEffect(() => {
    let fetchUrl = "https://rickandmortyapi.com/api/" + type;
    if (Object.keys(searchProps).length !== 0) {
      fetchUrl += "/?";
      const urlParams = new URLSearchParams();
      for (let key in searchProps) {
        urlParams.append(key, searchProps[key]);
      }
      fetchUrl += urlParams.toString();
    }
    fetch(fetchUrl)
      .then((response) => {
        if (response.status === 200) return response.json();
        if (response.status === 404)
          throw new Error("There's no data for your query :(");
        else throw new Error("Something went wrong :(");
      })
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
    <div className="main">
      <Filter
        filters={{
          status: ["alive", "dead", "unknown"],
          gender: ["male", "female", "genderless", "unknown"],
        }}
        updateSearchProps={updateSearchProps}
      />
      <div className="cards">
        <Search updateSearchProps={updateSearchProps} />
        {data.results &&
          data.info.next.includes("character") &&
          type === "character" &&
          data.results.map((item) => <CharacterCard info={item} />)}
        {data.results &&
          data.info.next.includes("location") &&
          type === "location" &&
          data.results.map((item) => <LocationCard info={item} />)}
        {data.results &&
          data.info.next.includes("episode") &&
          type === "episode" &&
          data.results.map((item) => <EpisodeCard info={item} />)}
        {error.status && <p className="not-found">${error.msg}</p>}
      </div>
      {!error.status && data.info && (
        <Pagination
          updateSearchProps={updateSearchProps}
          currPage={page}
          maxPage={data.info.pages}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default SearchPage;
