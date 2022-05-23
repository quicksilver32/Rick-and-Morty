import React, { useEffect, useState } from "react";
import "../../assets/styles/components/cards.css";
import "../../assets/styles/components/status-icon.css";
import { Link } from "react-router-dom";

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

const headerLinkTemplate = (id, name, type) => {
  return (
    <Link
      to={name === "unknown" ? "" : "/" + type + "/" + id}
      className="info-section__link"
    >
      <h2 className="info-section__title">{name}</h2>
    </Link>
  );
};

const CharacterCard = ({ info }) => {
  const [episode, setEpisode] = useState({});

  useEffect(() => {
    fetch(
      "https://rickandmortyapi.com/api/episode/" +
        info.episode[0].split("/").slice(-1)[0]
    )
      .then((response) => response.json())
      .then((result) => setEpisode(result));
  }, []);

  return (
    <div key={info.id} className="card">
      <img
        className="card__image"
        src={info.image}
        alt={info.name}
        height="220"
        width="220"
      />
      <div className="card__info">
        <div className="info-section">
          {headerLinkTemplate(info.id, info.name, "character")}
          <span className="info-section__status">
            <span className={`status-icon ${info.status.toLowerCase()}`} />
            {info.status} - {info.species}
          </span>
        </div>
        <div className="info-section">
          <span className="info-section__text">Last known location:</span>
          {linkTemplate(
            info.location.name,
            info.location.url.split("/").slice(-1)[0],
            "location"
          )}
        </div>
        <div className="info-section">
          <span className="info-section__text">First seen in:</span>
          {linkTemplate(episode.name, episode.id, "episode")}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
