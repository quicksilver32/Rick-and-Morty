import React from "react";
import "../../assets/styles/components/cards.css";
import "../../assets/styles/components/status-icon.css";
import { Link } from "react-router-dom";

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

const EpisodeCard = ({ info }) => {
  console.log(info);
  return (
    <div key={info.id} className="card card-short">
      <div className="card__info">
        <div className="info-section">
          {headerLinkTemplate(info.id, info.name, "episode")}
        </div>
        <div className="info-section">
          <span className="info-section__text">Episode:</span>
          <p className="description">{info.episode}</p>
        </div>
        <div className="info-section">
          <span className="info-section__text">Air date:</span>
          <p className="description">{info.air_date}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
