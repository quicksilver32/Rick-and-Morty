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
    getItems(getIdFromURL(info.episode[0]), "episode")
      .then((result) => setEpisode(result))
      .catch(() => setEpisode({}));
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
          <HeaderLinkTemplate id={info.id} name={info.name} type="character" />
          <span className="info-section__status">
            <span className={`status-icon ${info.status.toLowerCase()}`} />
            {info.status} - {info.species}
          </span>
        </div>
        <div className="info-section">
          <span className="info-section__text">Last known location:</span>
          <LinkTemplate
            name={info.location.name}
            id={getIdFromURL(info.location.url)}
            type="location"
          />
        </div>
        <div className="info-section">
          <span className="info-section__text">First seen in:</span>
          <LinkTemplate name={episode.name} id={episode.id} type="episode" />
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
