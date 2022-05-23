import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/styles/pages/character-page.css";

const linkTemplate = (name, id, type) => {
  return (
    <Link
      to={name === "unknown" ? "" : "/" + type + "/" + id}
      className="info-section__link"
    >
      {name}
    </Link>
  );
};

const CharacterPage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState();
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/" + id)
      .then((response) => response.json())
      .then((result) => {
        setInfo(result);
        return result.episode.map((item) => item.split("/").slice(-1)[0]);
      })
      .then((ids) => fetch("https://rickandmortyapi.com/api/episode/" + ids))
      .then((response) => response.json())
      .then((result) => {
        setEpisodes(result);
      });
  }, [id]);

  return (
    <div className="main">
      {Object.keys(info).length !== 0 && (
        <>
          <div className="first-section">
            <div className="info-section">
              <h2>{info.name}</h2>
              <span className="info-section__status">
                <span className={`status-icon ${info.status.toLowerCase()}`} />{" "}
                {info.status}
              </span>
            </div>
            <img
              className="info-section__image"
              src={info.image}
              alt="Duck With Muscles"
              height="300"
              width="300"
            />
          </div>
          <div className="second-section">
            <div className="species">
              <span className="species__value">{info.species}</span>
              <span className="species__value">{info.type}</span>
              <span className="species__value">
                <img
                  src={require(`../../assets/images/${info.gender.toLowerCase()}.png`)}
                  alt="male"
                  height="30"
                  width="30"
                />
                {info.gender}
              </span>
            </div>
            <div className="info">
              <div className="info-section">
                <span className="info-section__title">Origin location:</span>
                {linkTemplate(info.origin.name, info.origin.id, "location")}
              </div>
              <div className="info-section">
                <span className="info-section__title">
                  Last known location:
                </span>
                {linkTemplate(info.location.name, info.location.id, "location")}
              </div>
              <div className="info-section">
                <span className="info-section__title">Episodes:</span>
                <div className="episodes-wrapper">
                  {episodes.length !== 0 &&
                    episodes.map((item) => (
                      <div className="episode-code-wrapper">
                        <Link
                          to={`/episode/id=${item.id}`}
                          className="info-section__link episode"
                        >
                          {item.name}
                          <span className="episode-code">({item.episode})</span>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterPage;
