import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";

const LocationPage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/location/" + id)
      .then((response) => response.json())
      .then((result) => {
        setInfo(result);
        return result.residents.map((item) => item.split("/").slice(-1)[0]);
      })
      .then((ids) => fetch("https://rickandmortyapi.com/api/character/" + ids))
      .then((response) => response.json())
      .then((result) => {
        setCharacters(result);
      });
  }, [id]);

  return (
    <div className="main">
      {Object.keys(info).length !== 0 && (
        <>
          <h1 className="name">{info.name}</h1>
          <div className="episode-info">
            <span>
              <span className="episode-info__text">Dimension:&nbsp;</span>
              {info.dimension}
            </span>
            <span>
              <span className="episode-info__text">Type:&nbsp;</span>
              {info.type}
            </span>
          </div>
          <div className="info">
            <div className="cards">
              {characters.length !== 0 &&
                characters.map((item) => <CharacterCard info={item} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationPage;
