import { Link } from "react-router-dom";
import React from "react";

export const LinkTemplate = (name, id, type) => {
  return (
    <Link
      to={name === "unknown" ? "" : "/" + type + "/" + id}
      className="info-section__link"
    >
      {name}
    </Link>
  );
};

export const HeaderLinkTemplate = (id, name, type) => {
  return (
    <Link
      to={name === "unknown" ? "" : "/" + type + "/" + id}
      className="info-section__link"
    >
      <h2 className="info-section__title">{name}</h2>
    </Link>
  );
};

export const getIdFromURL = (url) => {
  return url.split("/").slice(-1)[0];
};

export const getItems = async (id, url) => {
  return fetch(`https://rickandmortyapi.com/api/${url}/${id}`).then(
    (response) => {
      if (response.status === 200) return response.json();
      if (response.status === 404)
        throw new Error("There's no data for your query :(");
      else throw new Error("Something went wrong :(");
    }
  );
};
