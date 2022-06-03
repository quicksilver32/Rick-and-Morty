import React from "react";
import "../../assets/styles/components/cards.css";
import "../../assets/styles/components/status-icon.css";
import { HeaderLinkTemplate } from "../utils/utils";

const LocationCard = ({ info }) => {
  return (
    <div key={info.id} className="card card-short">
      <div className="card__info">
        <div className="info-section">
          {HeaderLinkTemplate(info.id, info.name, "location")}
        </div>
        <div className="info-section">
          <span className="info-section__text">Dimension:</span>
          <p className="description">{info.dimension}</p>
        </div>
        <div className="info-section">
          <span className="info-section__text">Type:</span>
          <p className="description">{info.type}</p>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
