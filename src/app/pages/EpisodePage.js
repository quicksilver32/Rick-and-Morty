import React from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/styles/pages/episode-page.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import CharacterCard from "../components/CharacterCard";
import { useLoadAdditionalInfo } from "../components/useLoadAdditionalInfo";

const EpisodePage = () => {
  const { id } = useParams();

  const { loading, info, error, additionalData } = useLoadAdditionalInfo(
    id,
    "episode"
  );

  return (
    <div className="main-episode">
      {!loading && !error.status && (
        <>
          <div className="episode-nav">
            <span className="episode-nav-item">
              <NavigateBefore className={info.id === 1 ? "disabled" : ""} />
              <Link
                className={
                  "episode-nav-link " + (info.id === 1 ? "disabled" : "")
                }
                to={`/episode/${info.id - 1}`}
              >
                Prev. Episode
              </Link>
            </span>
            <h1 className="name">{info.name}</h1>
            <span className="episode-nav-item">
              <Link
                className={
                  "episode-nav-link " + (info.id === 51 ? "disabled" : "")
                }
                to={`/episode/${info.id + 1}`}
              >
                Next Episode
              </Link>
              <NavigateNext className={info.id === 51 ? "disabled" : ""} />
            </span>
          </div>
          <div className="episode-info">
            <span>
              Season {parseInt(info.episode.slice(1, 3))} Episode{" "}
              {parseInt(info.episode.slice(4, 6))}
            </span>
            <span>
              <span className="episode-info__text">Air date:&nbsp;</span>
              {info.air_date}
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

export default EpisodePage;
