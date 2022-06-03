import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import { getIdFromURL, getItems } from "../utils/utils";

const LocationPage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getItems(id, "location")
      .then((result) => {
        setInfo(result);
        return result.residents.map((item) => getIdFromURL(item));
      })
      .then((ids) => getItems(ids, "character"))
      .then((result) => {
        if (result.id) {
          setCharacters([result]);
        } else {
          setCharacters(result);
        }
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
