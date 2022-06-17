import React from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/styles/pages/character-page.css";
import { LinkTemplate } from "../utils/utils";
import { useLoadAdditionalInfo } from "../components/useLoadAdditionalInfo";

const CharacterPage = () => {
  const { id } = useParams();

  const { loading, info, error, additionalData } = useLoadAdditionalInfo(
    id,
    "character"
  );

  return (
    <div className="main-character">
      {!loading && !error.status && (
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
                  src={`../images/${info.gender.toLowerCase()}.png`}
                  alt="male"
                  height="30"
                  width="30"
                />
                {info.gender}
              </span>
            </div>
            <div className="info">
              <div className="info-section">
                <span className="info-section-page__title">
                  Origin location:
                </span>
                <LinkTemplate
                  name={info.origin.name}
                  id={info.origin.id}
                  type="location"
                  isPage={true}
                />
              </div>
              <div className="info-section">
                <span className="info-section-page__title">
                  Last known location:
                </span>
                <LinkTemplate
                  name={info.location.name}
                  id={info.location.id}
                  type="location"
                  isPage={true}
                />
              </div>
              <div className="info-section">
                <span className="info-section-page__title">Episodes:</span>
                <div className="episodes-wrapper">
                  {additionalData.length !== 0 &&
                    additionalData.map((item) => (
                      <div key={item.id} className="episode-code-wrapper">
                        <Link
                          to={`/episode/${item.id}`}
                          className="info-section-page__link episode"
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
      {error.status && <p className="not-found">{error.msg}</p>}
    </div>
  );
};

export default CharacterPage;
