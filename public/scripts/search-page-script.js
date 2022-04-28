import { errorTemplate } from "./templates.js";
import {getInfo, clearCards, getCards, getCurrPage} from "./utils.js";

const $cards = document.querySelector(".cards");
const $form = document.querySelector(".search__form");
const $formSearch = $form.querySelector(".search__input");
const $filters = document.querySelector(".filter");
const $pagination = document.querySelectorAll(".pagination__button");
const currUrl = getCurrPage(window.location.pathname);
const searchProps = {};
let searchValue = "";
let maxPage = 0;

/**
 * Получает данные, обновляет кнопки пагинации, данные о результате, отрисовывает карточки или сообщение об ошибке
 */
const updateCards = () => {
  getInfo(searchProps, currUrl)
    .then((data) => {
      maxPage = data.info.pages;
      $pagination.forEach((button) => (button.style.display = "flex"));
      if (maxPage === 1) {
        $pagination.forEach((button) => (button.style.display = "none"));
      }
      if (searchProps.page === maxPage) {
        document.querySelector(".pagination__button-next").style.display =
          "none";
      }
      if (searchProps.page === 1) {
        document.querySelector(".pagination__button-prev").style.display =
          "none";
      }
      getCards(data.results, currUrl, $cards);
    })
    .catch((err) => {
      $pagination.forEach((button) => (button.style.display = "none"));
      $cards.insertAdjacentHTML("beforeend", errorTemplate(err.message));
    });
};

/**
 * Формирует объект с фильтрами для поиска
 * @param filterName - имя фильтра
 * @param filterValue - значение фильтра
 * @param type - тип, "add" - добавляет фильтр, если его не было, переписывает значение, если уже был, "delete" - удаляет
 */
const updateSearchProps = (filterName, filterValue, type) => {
  filterName = filterName.replaceAll(":", "").toLowerCase();
  if (type === "add") {
    searchProps[filterName] = filterValue;
  } else {
    delete searchProps[filterName];
  }
};

updateSearchProps("page", 1, "add");
updateCards();

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchValue = $formSearch.value;
  updateSearchProps("name", searchValue, searchValue !== "" ? "add" : "delete");
  clearCards();
  updateCards();
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
        event.target.textContent.toLowerCase(),
        "add"
      );
    }
    clearCards();
    updateCards();
  }
});

$pagination.forEach((button) =>
  button.addEventListener("click", (event) => {
    console.log(event.target.classList);
    if (event.target.classList.contains("pagination__button-next")) {
      searchProps.page += 1;
      clearCards();
      updateCards();
    }
    if (event.target.classList.contains("pagination__button-prev")) {
      searchProps.page -= 1;
      clearCards();
      updateCards();
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  })
);
