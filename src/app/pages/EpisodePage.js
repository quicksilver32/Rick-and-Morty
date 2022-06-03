import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/styles/pages/episode-page.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import CharacterCard from "../components/CharacterCard";
import { getIdFromURL, getItems } from "../utils/utils";

const EpisodePage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getItems(id, "episode")
      .then((result) => {
        setInfo(result);
        return result.characters.map((item) => getIdFromURL(item));
      })
      .then((ids) => getItems(ids, "character"))
      .then((result) => {
        if (result.id) {
          setCharacters([result]);
        } else {
          setCharacters(result);
        }
      });
  }, [id]);

  return (
    <div className="main">
      {Object.keys(info).length !== 0 && (
        <>
          <div className="episode-nav">
            <span className="episode-nav-item">
              <NavigateBefore className={info.id === 1 && "disabled"} />
              <Link
                className={"episode-nav-link " + (info.id === 1 && "disabled")}
                to={`/episode/${info.id - 1}`}
              >
                Prev. Episode
              </Link>
            </span>
            <h1 className="name">{info.name}</h1>
            <span className="episode-nav-item">
              <Link
                className={"episode-nav-link " + (info.id === 51 && "disabled")}
                to={`/episode/${info.id + 1}`}
              >
                Next Episode
              </Link>
              <NavigateNext className={info.id === 51 && "disabled"} />
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
              {characters.length !== 0 &&
                characters.map((item) => <CharacterCard info={item} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EpisodePage;
