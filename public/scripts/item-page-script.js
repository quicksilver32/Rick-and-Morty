import {
  getCharacterPageTemplate,
  getEpisodePageTemplate,
  getLocationPageTemplate,
} from "./templates.js";
import { getCards, getIdFromURL, reformatEpisode } from "./utils.js";

const currId = new URLSearchParams(window.location.search).get("id");

let currUrl = "";
if (window.location.pathname.includes("character")) {
  currUrl = "character";
}
if (window.location.pathname.includes("location")) {
  currUrl = "location";
}
if (window.location.pathname.includes("episode")) {
  currUrl = "episode";
}

const getItem = async (id, url) => {
  const response = await fetch(`https://rickandmortyapi.com/api/${url}/${id}`);
  if (response.status === 200) {
    return await response.json();
  }
};

getItem(currId, currUrl).then((data) => {
  let template = "";
  let ids = [];
  switch (currUrl) {
    case "character":
      template = getCharacterPageTemplate(
        data.name,
        data.status,
        data.image,
        data.species,
        data.type,
        data.gender,
        data.location.name,
        getIdFromURL(data.location.url),
        data.origin.name,
        getIdFromURL(data.origin.url)
      );
      document.body
        .querySelector(".main")
        .insertAdjacentHTML("beforeend", template);
      ids = data.episode.map((item) => getIdFromURL(item));
      const $episodes = document.querySelector(".episodes-wrapper");
      getItem(ids, "episode").then((data) => {
        if (Array.isArray(data)) {
          data.forEach((item) => {
            const episodeTemplate = `
        <a
          href="/episode.html?id=${item.id}"
          rel="nofollow noopener noreferrer"
          class="info-section__link episode"
        >
          ${item.name} (${item.episode}),
        </a>
      `;
            $episodes.insertAdjacentHTML("beforeend", episodeTemplate);
          });
        } else {
          $episodes.insertAdjacentHTML(
            "beforeend",
            `
                  <a
                    href="/episode.html?id=${data.id}"
                    rel="nofollow noopener noreferrer"
                    class="info-section__link episode"
                  >
                    ${data.name} (${data.episode}),
                  </a>
                 `
          );
        }
      });
      break;

    case "location":
      template = getLocationPageTemplate(data.name, data.dimension, data.type);
      ids = data.residents.map((item) => getIdFromURL(item));
      getItem(ids, "character").then((data) => {
        document.body
          .querySelector(".main")
          .insertAdjacentHTML("beforeend", template);
        getCards(data, "character", document.querySelector(".cards"));
      });
      break;

    case "episode":
      template = getEpisodePageTemplate(
        data.id,
        data.name,
        reformatEpisode(data.episode),
        data.air_date
      );
      ids = data.characters.map((item) => getIdFromURL(item));
      getItem(ids, "character").then((data) => {
        document.body
          .querySelector(".main")
          .insertAdjacentHTML("beforeend", template);
        getCards(data, "character", document.querySelector(".cards"));
      });
  }
});
