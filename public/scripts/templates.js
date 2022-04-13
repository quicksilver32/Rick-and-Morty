export const getCharacterCardTemplate = (
  image,
  name,
  id,
  status,
  species,
  locationName,
  locationId,
  originName,
  originId
) => {
  return `
            <div class="card">
                <img
                  class="card__image"
                  src="${image}"
                  alt="${name}"
                  height="220"
                  width="220"
                />
                <div class="card__info">
                  <div class="info-section">
                    <a
                      href="/character.html?id=${id}"
                      rel="nofollow noopener noreferrer"
                      class="info-section__link"
                    >
                      <h2 class="info-section__title">${name}</h2>
                    </a>
                    <span class="info-section__status">
                      <span class="status-icon ${status.toLowerCase()}"></span> ${status} - ${species}
                    </span>
                  </div>
                  <div class="info-section">
                    <span class="info-section__text">Last known location:</span
                    ><a
                      href="${
                        locationName === "unknown"
                          ? ""
                          : "/location.html?id=" + locationId
                      }"
                      rel="nofollow noopener noreferrer"
                      class="info-section__link"
                      >${locationName}</a
                    >
                  </div>
                  <div class="info-section">
                    <span class="info-section__text">First seen in:</span
                    ><a
                      href="${
                        originName === "unknown"
                          ? ""
                          : "/episode.html?id=" + originId
                      }"
                      rel="nofollow noopener noreferrer"
                      class="info-section__link"
                      >${originName}</a
                    >
                  </div>
                </div>
              </div>
            `;
};

export const getEpisodeCardTemplate = (id, name, episode, air_date) => {
  return `
            <div class="card card-short">
              <div class="card__info">
                <div class="info-section">
                  <a
                    href="episode.html?id=${id}"
                    rel="nofollow noopener noreferrer"
                    class="info-section__link"
                  >
                    <h2>${name}</h2>
                  </a>
                </div>
                <div class="info-section">
                  <span class="info-section__text">Episode:</span>
                  <p class="description">${episode}</p>
                </div>
                <div class="info-section">
                  <span class="info-section__text">Air date:</span>
                  <p class="description">${air_date}</p>
                </div>
              </div>
            </div>
          `;
};

export const getLocationCardTemplate = (id, name, dimension, type) => {
  return `
            <div class="card card-short">
              <div class="card__info">
                <div class="info-section">
                  <a
                    href="location.html?id=${id}"
                    rel="nofollow noopener noreferrer"
                    class="info-section__link"
                  >
                    <h2>${name}</h2>
                    </a>
                </div>
                <div class="info-section">
                    <span class="info-section__text">Dimension:</span>
                    <p class="description">${dimension}</p>
                </div>
                <div class="info-section">
                    <span class="info-section__text">Type:</span>
                    <p class="description">${type}</p>
                </div>
                </div>
            </div>
            `;
};

export const getCharacterPageTemplate = (
  name,
  status,
  image,
  species,
  type,
  gender,
  locationName,
  locationId,
  originName,
  originId
) => {
  return `
        <div class="first-section">
                <div class="info-section">
                  <h2>${name}</h2>
                  <span class="info-section__status">
                    <span class="status-icon ${status.toLowerCase()}"></span> ${status}
                  </span>
                </div>
                <img
                  class="info-section__image"
                  src="${image}"
                  alt="Duck With Muscles"
                  height="300"
                  width="300"
                />
              </div>
              <div class="second-section">
                <div class="species">
                  <span class="species__value">${species}</span>
                  <span class="species__value">${type}</span>
                  <span class="species__value"
                    ><img
                      src="images/${gender.toLowerCase()}.png"
                      alt="male"
                      height="30"
                      width="30"
                    />${gender}</span
                  >
                </div>
                <div class="info">
                  <div class="info-section">
                    <span class="info-section__title">Origin location:</span
                    ><a
                      href="${
                        originName === "unknown"
                          ? ""
                          : "/location.html?id=" + originId
                      }"
                      rel="nofollow noopener noreferrer"
                      class="info-section__link"
                      >${originName}</a
                    >
                  </div>
                  <div class="info-section">
                    <span class="info-section__title">Last known location:</span
                    ><a
                      href="${
                        locationName === "unknown"
                          ? ""
                          : "/location.html?id=" + locationId
                      }"
                      rel="nofollow noopener noreferrer"
                      class="info-section__link"
                      >${locationName}</a
                    >
                  </div>
                  <div class="info-section">
                    <span class="info-section__title">Episodes:</span>
                    <div class="episodes-wrapper">
                    </div>
                  </div>
                </div>
              </div>
            </div>
      `;
};

export const getLocationPageTemplate = (name, dimension, type) => {
  return `<h1 class="name">${name}</h1>
        <div class="episode-info">
          <span
            ><span class="episode-info__text">Dimension:&nbsp;</span>${dimension}</span
          >
          <span><span class="episode-info__text">Type:&nbsp;</span>${type}</span>
        </div>
        <div class="info">
          <div class="cards">
          </div>
        </div>
`;
};

export const getEpisodePageTemplate = (id, name, episode, air_date) => {
  let tempPrev = `
    <span class="episode-nav-item">
      <span class="material-icons">navigate_before</span>
      <a class="episode-nav-link" href="/episode.html?id=${id - 1}">
        Prev. Episode
      </a>
    </span>
  `;
  let tempNext = `
  <span class="episode-nav-item">
    <a class="episode-nav-link" href="/episode.html?id=${id + 1}">
        Next Episode
    </a>
    <span class="material-icons">navigate_next</span>
  </span>  
  `;
  if (id === 1) {
    tempPrev = `
    <span class="episode-nav-item disabled">
      <span class="material-icons">navigate_before</span>
        Prev. Episode
    </span>
  `;
    if (id === 51) {
      tempNext = `
        <span class="episode-nav-item disabled">
            Next Episode
            <span class="material-icons">navigate_next</span>
        </span>;
      `;
    }
  }
  return `<div class="episode-nav">
          ${tempPrev}           
          <h1 class="name">${name}</h1>
          ${tempNext}
        </div>
        <div class="episode-info">
          <span>${episode}</span>
          <span
            ><span class="episode-info__text">Air date:&nbsp;</span>${air_date}</span
          >
        </div>
        <div class="info">
          <div class="cards">
          </div>
        </div>
        `;
};

export const errorTemplate = (msg) => {
  return `
  <p class="not-found">${msg}</p>
  `;
};
