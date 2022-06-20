import React from "react";
import { useParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import "../../assets/styles/pages/location-page.css";
import { useLoadAdditionalInfo } from "../components/useLoadAdditionalInfo";

const LocationPage = () => {
  const { id } = useParams();
  const { loading, info, error, additionalData } = useLoadAdditionalInfo(
    id,
    "location"
  );

  return (
    <div className="main-location">
      {!loading && !error.status && (
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
              {additionalData.length !== 0 &&
                additionalData.map((item) => (
                  <CharacterCard key={item.id} info={item} />
                ))}
            </div>
          </div>
        </>
      )}
      {error.status && <p className="not-found">{error.msg}</p>}
    </div>
  );
};

export default LocationPage;
