import {
  getCharacterCardTemplate,
  getEpisodeCardTemplate,
  getLocationCardTemplate,
} from "./templates.js";

/**
 * Получение данных с определенными фильтрами
 * @param searchProps - объект с филтьрами
 * @param url - где надо искать
 * @returns {Promise<T>} - Промис с данными или ошибка
 */
export const getInfo = (searchProps, url) => {
  let fetchUrl = "https://rickandmortyapi.com/api/" + url;
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
    if (response.status === 404)
      throw new Error("There's no data for your query :(");
    else throw new Error("Something went wrong :(");
  });
};

/**
 * Возвращает код эпизода в формате "Season X Episode X"
 * @param episode - код эпизода из API
 * @returns {string}
 */
export const reformatEpisode = (episode) => {
  return `Season ${parseInt(episode.slice(1, 3))} Episode ${parseInt(
    episode.slice(4, 6)
  )}`;
};

/**
 * Возвращает id элемента из url
 * @param url - endpoint определённого элемента
 * @returns {string}
 */
export const getIdFromURL = (url) => {
  return url.split("/").slice(-1)[0];
};

/**
 * По данным с API формирует карточки и вставляет на страницу
 * @param data - данные с API
 * @param type - тип карточек
 * @param $cards - DOM-элемент, в который помещаются карточки
 */
export const getCards = (data, type, $cards) => {
  for (let item of data) {
    let template = "";
    switch (type) {
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

/**
 * Очищает содержимое элемента .cards за исключением строки поиска
 */
export const clearCards = () => {
  [...document.querySelectorAll(".card")].forEach((card) => card.remove());
  document.querySelector(".not-found") &&
    document.querySelector(".not-found").remove();
};

/**
 * Возравщает строку, соответвующую текущей странице (герои, эпизоды, локации)
 * @param pathname - текущий url
 * @returns {string}
 */
export const getCurrPage = (pathname) => {
  if (pathname.includes("character")) {
    return "character";
  }
  if (pathname.includes("location")) {
    return "location";
  }
  if (pathname.includes("episode")) {
    return "episode";
  }
}
