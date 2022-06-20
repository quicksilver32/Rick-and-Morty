import React from "react";
import "../../assets/styles/components/cards.css";
import "../../assets/styles/components/status-icon.css";
import { getIdFromURL, HeaderLinkTemplate, LinkTemplate } from "../utils/utils";
import { useLoadInfo } from "./useLoadInfo";

const CharacterCard = ({ info }) => {
  const { loading, data, error } = useLoadInfo(
    getIdFromURL(info.episode[0]),
    "episode"
  );

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
          {!loading && !error.status && (
            <LinkTemplate name={data.name} id={data.id} type="episode" />
          )}
          {error.status && <p className="info-section__link">({error.msg})</p>}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
