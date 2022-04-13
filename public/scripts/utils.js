import {
  getCharacterCardTemplate,
  getEpisodeCardTemplate,
  getLocationCardTemplate,
} from "./templates.js";

export const getInfo = (searchProps, currUrl) => {
  let fetchUrl = "https://rickandmortyapi.com/api/" + currUrl;
  if (Object.keys(searchProps).length !== 0) {
    fetchUrl += "/?";
    const urlParams = new URLSearchParams();
    for (let key in searchProps) {
      urlParams.append(key, searchProps[key]);
    }
    fetchUrl += urlParams.toString();
  }
  console.log(fetchUrl);
  return fetch(fetchUrl).then((response) => {
    if (response.status === 200) return response.json();
    if (response.status === 404) throw new Error("Not found");
    else throw new Error("Smth went wrong");
  });
};

export const reformatEpisode = (episode) => {
  return `Season ${parseInt(episode.slice(1, 3))} Episode ${parseInt(
    episode.slice(4, 6)
  )}`;
};

export const getIdFromURL = (url) => {
  return url.split("/").slice(-1)[0];
};

export const getCards = (data, url, $cards) => {
  for (let item of data) {
    let template = "";
    switch (url) {
      case "character":
        fetch(
          "https://rickandmortyapi.com/api/episode/" +
            getIdFromURL(item.episode[0])
        )
          .then((res) => res.json())
          .then((data) => {
            template = getCharacterCardTemplate(
              item.image,
              item.name,
              item.id,
              item.status,
              item.species,
              item.location.name,
              getIdFromURL(item.location.url),
              data.name,
              data.id
            );
            $cards.insertAdjacentHTML("beforeend", template);
          });
        break;
      case "episode":
        template = getEpisodeCardTemplate(
          item.id,
          item.name,
          reformatEpisode(item.episode),
          item.air_date
        );
        $cards.insertAdjacentHTML("beforeend", template);
        break;
      case "location":
        template = getLocationCardTemplate(
          item.id,
          item.name,
          item.dimension,
          item.type
        );
        $cards.insertAdjacentHTML("beforeend", template);
        break;
    }
  }
};

export const clearCards = () => {
  [...document.querySelectorAll(".card")].forEach((card) => card.remove());
  document.querySelector(".not-found") &&
    document.querySelector(".not-found").remove();
};
