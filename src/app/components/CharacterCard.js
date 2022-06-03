import React, { useEffect, useState } from "react";
import "../../assets/styles/components/cards.css";
import "../../assets/styles/components/status-icon.css";
import {
  getIdFromURL,
  getItems,
  HeaderLinkTemplate,
  LinkTemplate,
} from "../utils/utils";

const CharacterCard = ({ info }) => {
  const [episode, setEpisode] = useState({});

  useEffect(() => {
    getItems(getIdFromURL(info.episode[0]), "episode").then((result) =>
      setEpisode(result)
    );
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
          {HeaderLinkTemplate(info.id, info.name, "character")}
          <span className="info-section__status">
            <span className={`status-icon ${info.status.toLowerCase()}`} />
            {info.status} - {info.species}
          </span>
        </div>
        <div className="info-section">
          <span className="info-section__text">Last known location:</span>
          {LinkTemplate(
            info.location.name,
            getIdFromURL(info.location.url),
            "location"
          )}
        </div>
        <div className="info-section">
          <span className="info-section__text">First seen in:</span>
          {LinkTemplate(episode.name, episode.id, "episode")}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
