import { notFoundTemplate } from "./templates.js";
import { getInfo, clearCards, getCards } from "./utils.js";

const $cards = document.querySelector(".cards");
const $form = document.querySelector(".search__form");
const $formSearch = $form.querySelector(".search__input");
const $filters = document.querySelector(".filter");
const $pagination = document.querySelectorAll(".pagination__button");
const currUrl = window.location.pathname.slice(1, -6);
const searchProps = {};
let searchValue = "";
let maxPage = 0;

const updateSearchProps = (filterName, filterValue, type) => {
  filterName = filterName.replaceAll(":", "").toLowerCase();
  if (type === "add") {
    searchProps[filterName] = filterValue;
  } else {
    delete searchProps[filterName];
  }
};

updateSearchProps("page", 1, "add");
getInfo(searchProps, currUrl)
  .then((data) => {
    maxPage = data.info.pages;
    if (maxPage === 1) {
      [...$pagination].forEach((button) => (button.style.display = "none"));
    }
    getCards(data.results, currUrl, $cards);
  })
  .catch((err) => console.log(err));

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchValue = $formSearch.value;
  updateSearchProps("name", searchValue, searchValue !== "" ? "add" : "delete");
  clearCards();
  getInfo(searchProps, currUrl)
    .then((data) => {
      maxPage = data.info.pages;
      if (maxPage === 1) {
        [...$pagination].forEach((button) => (button.style.display = "none"));
      }
      getCards(data.results, currUrl, $cards);
    })
    .catch((err) => {
      console.log(err.message);
      if (err.message === "Not found")
        $cards.insertAdjacentHTML("beforeend", notFoundTemplate());
    });
});

$filters.addEventListener("click", (event) => {
  if (event.target.classList.contains("filter__value")) {
    if (event.target.classList.contains("filter-selected")) {
      event.target.classList.remove("filter-selected");
      updateSearchProps(
        event.target.parentNode.previousElementSibling.textContent,
        event.target.textContent,
        "delete"
      );
    } else {
      [...event.target.parentNode.children].forEach((item) =>
        item.classList.remove("filter-selected")
      );
      event.target.classList.add("filter-selected");
      updateSearchProps(
        event.target.parentNode.previousElementSibling.textContent,
        event.target.textContent,
        "add"
      );
    }
    clearCards();
    getInfo(searchProps, currUrl)
      .then((data) => {
        maxPage = data.info.pages;
        if (maxPage === 1) {
          [...$pagination].forEach((button) => (button.style.display = "none"));
        }
        getCards(data.results, currUrl, $cards);
      })
      .catch((err) => console.log(err));
  }
});

[...$pagination].forEach((button) =>
  button.addEventListener("click", (event) => {
    if (event.target.id === "pg-button-next") {
      searchProps.page += 1;
      clearCards();
      getInfo(searchProps, currUrl)
        .then((data) => {
          maxPage = data.info.pages;
          if (maxPage === 1) {
            [...$pagination].forEach(
              (button) => (button.style.display = "none")
            );
          }
          getCards(data.results, currUrl, $cards);
        })
        .catch((err) => console.log(err));
      if (searchProps.page === maxPage) {
        event.target.style.display = "none";
      } else {
        [...$pagination].forEach((button) => (button.style.display = "flex"));
      }
    }
    if (event.target.id === "pg-button-prev") {
      searchProps.page -= 1;
      clearCards();
      getInfo(searchProps, currUrl)
        .then((data) => {
          maxPage = data.info.pages;
          if (maxPage === 1) {
            [...$pagination].forEach(
              (button) => (button.style.display = "none")
            );
          }
          getCards(data.results, currUrl, $cards);
        })
        .catch((err) => console.log(err));
      if (searchProps.page === 1) {
        event.target.style.display = "none";
      } else {
        [...$pagination].forEach((button) => (button.style.display = "flex"));
      }
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  })
);
