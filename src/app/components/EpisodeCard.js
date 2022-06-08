import React from "react";
import "../../assets/styles/components/cards.css";
import "../../assets/styles/components/status-icon.css";
import { HeaderLinkTemplate } from "../utils/utils";

const EpisodeCard = ({ info }) => {
  return (
    <div key={info.id} className="card card-short">
      <div className="card__info">
        <div className="info-section">
          <HeaderLinkTemplate id={info.id} name={info.name} type="episode" />
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
